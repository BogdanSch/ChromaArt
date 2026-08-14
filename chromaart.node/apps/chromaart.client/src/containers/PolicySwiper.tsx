import axios from "axios";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import { LazyImage } from "../components";
import { Alert } from "react-bootstrap";
import { API_URL } from "../variables";
import type { SiteSettingDto } from "../types";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PolicySwiper() {
  const [requestError, setRequestError] = useState<string | null>(null);
  const fetchPolicyRecords = async (): Promise<SiteSettingDto[]> => {
    try {
      const { data } = await axios.get<SiteSettingDto[]>(
        `${API_URL}/site-settings/policy`,
      );
      return data;
    } catch (error) {
      const defaultErrorMessage: string = "Error fetching policy records.";
      console.error(defaultErrorMessage, error);
      if (axios.isAxiosError(error) && error.response) {
        setRequestError(error.response.data?.message);
      } else {
        setRequestError(defaultErrorMessage);
      }
      return [];
    }
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ["policyImages"],
    queryFn: fetchPolicyRecords,
    retry: 2,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Alert variant={"danger"} show={requestError !== null || error !== null}>
        {requestError || error?.message}
      </Alert>
      <Swiper
        pagination={{
          type: "progressbar",
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Virtual, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={20}
        className="policy__swiper"
        virtual
      >
        {data?.map((record) => {
          return (
            <SwiperSlide key={`policy-record-${record.id}`}>
              <LazyImage src={record.value} alt={record.key} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
