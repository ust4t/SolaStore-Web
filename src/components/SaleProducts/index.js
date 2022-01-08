import { Row } from "antd";
import React, { useState } from "react";

import { useQuery } from "react-query";
import Loader from "../Loader";
import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import PopularCard from "../Cards/PopularCard";

const fetchSale = async () => {
  const res = await fetch("/api/products/getSaleProducts");
  const data = await res.json();
  return data;
};
export default function SaleProducts({ saleProducts }) {
  // const { isLoading, error, data } = useQuery("saleProducts", fetchSale);

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <HomePageProductSliderWithArrow extraClass="slider-active-three common-arrows ">
      {saleProducts
        .slice(0, saleProducts.length >= 12 ? 12 : saleProducts.length)
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
    //   )}
    // </>
  );
}
