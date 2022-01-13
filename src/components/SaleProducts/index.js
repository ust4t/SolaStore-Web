import React from "react";

import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import PopularCard from "../Cards/PopularCard";

export default function SaleProducts({ saleProducts }) {
  return (
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
                  singlePrice: productData.singlePrice,
                  sizes: productData.sizes,
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
  );
}
