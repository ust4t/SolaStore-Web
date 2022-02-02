import React from "react";

import PopularCard from "../Cards/PopularCard";
import { useQuery } from "react-query";
import Loader from "../Loader";
import { embla__slide, embla__slide__inner } from "./ProductSliders.module.css";
import EmblaSlider from "../EmblaSlider";

const fetchPopulars = async () => {
  const res = await fetch("/api/getPopulars");
  const data = await res.json();
  return data;
};

function PopularProducts({ setAnim }) {
  const {
    isLoading,
    error,
    data: popularData,
  } = useQuery("popularProducts", fetchPopulars);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
          {popularData
            .slice(0, popularData.length >= 12 ? 12 : popularData.length)
            .map((productData, index) => {
              return (
                <div
                  key={`${productData.id}_**_${index}`}
                  className={embla__slide}>
                  <div className={embla__slide__inner}>
                    <PopularCard
                      cartId="popularProducts"
                      setAnim={setAnim}
                      productData={{
                        ...productData,
                        index,
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </EmblaSlider>
      )}
    </>
  );
}

export default PopularProducts;
