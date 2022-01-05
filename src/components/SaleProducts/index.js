import { Row } from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";
import MainProductCard from "../Cards/MainProductCard";
import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import PopularCard from "../Cards/PopularCard";

const fetchSale = async () => {
  const res = await fetch("/api/products/getSaleProducts");
  const data = await res.json();
  return data;
};
export default function SaleProducts() {
  const { isLoading, error, data } = useQuery("saleProducts", fetchSale);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <HomePageProductSliderWithArrow extraClass="slider-active-three common-arrows ">
          {data.data
            .filter((item) => item.oldPrice > 0)
            .map((productData) => {
              return (
                <div className="home_3_margin" key={productData.id}>
                  <PopularCard
                    productData={{
                      id: productData.productID,
                      name: productData.productShortName,
                      images: productData.pictures,
                      price: productData.price,
                      oldPrice: productData.oldPrice,
                      productStockCode: productData.productStockCode,
                      discount: productData.singlePrice,
                      video_1: productData.video_1,
                    }}
                  />
                </div>
              );
            })}
        </HomePageProductSliderWithArrow>
      )}
    </>
  );
}
