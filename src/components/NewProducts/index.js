import React from "react";

import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import PopularCard from "../Cards/PopularCard";

export default function NewProducts({ newProducts }) {
  return (
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
                  video_1: productData.video_1,
                }}
              />
            </div>
          );
        })}
    </HomePageProductSliderWithArrow>
  );
}
