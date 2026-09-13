import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Virtual } from "swiper/modules";
import { LazyImage } from "@/components";
import { useNetworkError } from "@/hooks/useNetworkError";
import { API_URL } from "shared/variables";
import type { SiteSettingDto } from "../types";

import { Alert } from "react-bootstrap";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PolicySwiper() {
  const { handleErrorOutput } = useNetworkError(
    "Error, could not fetch policy records.",
  );
  const fetchPolicyRecords = async (): Promise<SiteSettingDto[]> => {
    try {
      const { data } = await axios.get<SiteSettingDto[]>(
        `${API_URL}/site-settings/policy`,
      );
      return data;
    } catch (e) {
      handleErrorOutput(e);
    } finally {
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
  } else if (error) {
    return <Alert variant={"danger"}>{error.message}</Alert>;
  }
  return (
    <>
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
