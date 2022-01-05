import { Row } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import PopularCard from "../Cards/PopularCard";
import { getPopulars } from "../../redux/action/populars";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";
import { HomePageProductSliderWithArrow } from "../sliders/HomePageSlider";
import Product from "../product/Product";
import BrandSlider from "../sliders/BrandSlider";

const fetchPopulars = async () => {
  const res = await fetch("/api/getPopulars");
  const data = await res.json();
  return data;
};

function PopularProducts() {
  const {
    isLoading,
    error,
    data: popularData,
  } = useQuery(
    "popularProducts",
    fetchPopulars
    // {
    //   onSuccess: (data) => {
    //     if (data) setPopularData(data);
    //   },
    // }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <HomePageProductSliderWithArrow extraClass=" slider-active-three common-arrows ">
          {popularData.map((productData, i) => {
            return (
              <div className="home_3_margin" key={`${productData.id}_**_${i}`}>
                <PopularCard productData={productData} />
              </div>
            );
          })}
        </HomePageProductSliderWithArrow>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  popular: state.populars,
});

export default connect(mapStateToProps, {
  getPopulars,
})(PopularProducts);
