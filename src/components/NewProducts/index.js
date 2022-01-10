import { Row } from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";
import MainProductCard from "../Cards/MainProductCard";
import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import PopularCard from "../Cards/PopularCard";

export default function NewProducts({ newProducts }) {
  // const [newProduct, setNewProduct] = useState([]);
  // const { isLoading, error, data } = useQuery(
  //   "newProduct",
  //   () => fetch("/api/products/getNewProducts").then((res) => res.json()),
  //   {
  //     onSuccess: ({ data }) => {
  //       setNewProduct(data);
  //     },
  //   }
  // );
  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <HomePageProductSliderWithArrow extraClass="slider-active-three common-arrows ">
      {newProducts
        .slice(0, newProducts.length >= 12 ? 12 : newProducts.length)
        .map((productData, i) => {
          return (
            <div
              className="home_3_margin"
              key={`${productData.productID}*_${i}`}>
              <PopularCard
                productData={{
                  id: productData.productID,
                  name: productData.productShortName,
                  images: productData.pictures,
                  sizes: productData.sizes,
                  singlePrice: productData.singlePrice,
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
    //   )}
    // </>
  );
}
