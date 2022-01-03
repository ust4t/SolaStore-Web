import { Row } from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";
import MainProductCard from "../Cards/MainProductCard";

export default function NewProducts() {
  const [newProducts, setNewProducts] = useState([]);
  const { isLoading, error, data } = useQuery(
    "newProducts",
    () => fetch("/api/products/getNewProducts").then((res) => res.json()),
    {
      onSuccess: ({ data }) => {
        setNewProducts(data);
      },
    }
  );
  console.log(newProducts);
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
          {newProducts
            .slice(0, newProducts.length - 8)
            .map(({ masterProductID, productShortName, pictures, price }) => {
              return (
                <SwiperSlide key={masterProductID}>
                  <MainProductCard
                    id={masterProductID}
                    price={price}
                    name={productShortName}
                    images={pictures}
                  />
                </SwiperSlide>
              );
            })}
        </Swiper>
      )}
    </Row>
  );
}
