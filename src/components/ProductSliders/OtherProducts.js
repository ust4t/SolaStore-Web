import React from "react";

import PopularCard from "../Cards/PopularCard";
import EmblaSlider from "../EmblaSlider";
import { embla__slide, embla__slide__inner } from "./ProductSliders.module.css";

export default function OtherProducts({ products, id }) {
  return (
    <EmblaSlider
      config={{
        infinite: true,
        loop: true,
        draggable: true,
        dragFree: true,
        skipSnaps: false,
        align: "center",
        startIndex: 3,
        containScroll: "keepSnaps",
      }}>
      {products
        .slice(0, products.length >= 8 ? 8 : products.length)
        .map((productData, index) => {
          return (
            <div
              key={`${productData.productID}*_${index}`}
              className={embla__slide}>
              <div className={embla__slide__inner}>
                <PopularCard
                  cartId={id}
                  productData={{
                    index,
                    id: productData.masterProductID,
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
            </div>
          );
        })}
    </EmblaSlider>
  );
}
