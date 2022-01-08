import React from "react";

import PopularCard from "../Cards/PopularCard";
import { useQuery } from "react-query";
import Loader from "../Loader";
import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";

const fetchPopulars = async () => {
  const res = await fetch("/api/getPopulars");
  const data = await res.json();
  return data;
};

function PopularProducts({ popularProducts }) {
  // const {
  //   isLoading,
  //   error,
  //   data: popularData,
  // } = useQuery("popularProducts", fetchPopulars);

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <HomePageProductSliderWithArrow extraClass=" slider-active-three common-arrows ">
      {popularProducts
        .slice(0, popularProducts.length >= 12 ? 12 : popularProducts.length)
        .map((productData, i) => {
          return (
            <div className="home_3_margin" key={`${productData.id}_**_${i}`}>
              <PopularCard productData={productData} />
            </div>
          );
        })}
    </HomePageProductSliderWithArrow>
    //   )}
    // </>
  );
}

export default PopularProducts;
