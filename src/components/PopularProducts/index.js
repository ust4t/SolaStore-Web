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

function PopularProducts({ popularData, setPopularData }) {
  const { isLoading, error, data } = useQuery(
    "popularProducts",
    fetchPopulars,
    {
      onSuccess: (data) => {
        if (data) setPopularData(data);
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <HomePageProductSliderWithArrow extraClass=" slider-active-three common-arrows ">
          {popularData
            .slice(14, data.length - 1)
            .map(
              ({ id, name, images, price, discount, oldPrice, variants }) => {
                return (
                  <div className="home_3_margin" key={id}>
                    <PopularCard
                      id={id}
                      price={price}
                      oldPrice={oldPrice}
                      name={name}
                      discount={discount}
                      images={images}
                      variants={variants}
                    />
                  </div>
                );
              }
            )}
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
