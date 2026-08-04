import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Card } from "react-bootstrap";
import { Pagination, Virtual, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyImage } from "../components";
import { API_URL } from "../variables";
import type { PricingCategoryDto } from "../types";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PricingSelector() {
  const [requestError, setRequestError] = useState<string | null>(null);
  const fetchPricingCategories = async (): Promise<PricingCategoryDto[]> => {
    try {
      const { data } = await axios.get<PricingCategoryDto[]>(
        `${API_URL}/pricing-categories`,
      );
      data.sort((a, b) => a.displayOrder - b.displayOrder);
      return data.filter((c) => c.isActive);
    } catch (error) {
      console.error("Error fetching pricing categories:", error);
      if (axios.isAxiosError(error) && error.response) {
        setRequestError(error.response.data?.message);
      } else {
        setRequestError("Error fetching pricing categories.");
      }
      return [];
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["pricingCategories"],
    queryFn: fetchPricingCategories,
  });
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore | null>(null);
  const slideTo = (index: number) => {
    swiperInstance?.slideTo(index);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Alert variant={"danger"} show={requestError !== null || error !== null}>
        {requestError || error?.message}
      </Alert>
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        virtual
      >
        {data?.map((category) => (
          <SwiperSlide
            key={`category-${category.id}`}
            virtualIndex={category.displayOrder}
          >
            <Card className="pricing-category">
              <LazyImage
                src={category.previewUrl}
                alt={category.name}
                containerClassName="card-img"
              />
              <Card.Body>
                <h3 className="pricing-category__title">{category.name}</h3>
                <p className="pricing-category__description">
                  {category.description}
                </p>
                <p className="pricing-category__price">
                  Starting at €{category.startingPrice.toFixed(2)}
                </p>
              </Card.Body>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="pricing-selector">
        <div className="pricing-selector__tabs">
          {data?.map((pricingCategory) => (
            <button
              key={`tab-${pricingCategory.id}`}
              className="btn btn-lg pricing-selector__tab"
              onClick={() => slideTo(pricingCategory.displayOrder)}
            >
              {pricingCategory.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
