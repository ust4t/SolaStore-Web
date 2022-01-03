import { Row } from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";
import MainProductCard from "../Cards/MainProductCard";

const fetchSale = async () => {
  const res = await fetch("/api/getPopulars");
  const data = await res.json();
  return data;
};
export default function SaleProducts({ popularData, setPopularData }) {
  // const [saleProducts, setSaleProducts] = useState([]);
  const { isLoading, error } = useQuery("saleProducts", fetchSale, {
    onSuccess: (data) => {
      if (data) setPopularData(data);
    },
  });
  console.log(popularData);
  return (
    <Row className="popular-products">
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={1}
          loopFillGroupWithBlank={true}
          loop={true}
          autoplay={{
            delay: 8000,
          }}
          breakpoints={{
            395: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper">
          {popularData
            .filter((item) => item.oldPrice > 0)
            .slice(0, popularData.length - 8)
            .map(({ id, name, images, price, oldPrice }) => {
              return (
                <SwiperSlide key={id}>
                  <MainProductCard
                    id={id}
                    price={price}
                    name={name}
                    images={images}
                    oldPrice={oldPrice}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </Row>
  );
}
