import { Row } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";

import PopularCard from "../Cards/PopularCard";
import { getPopulars } from "../../redux/action/populars";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Loader from "../Loader";

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
    <Row className="popular-products">
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={1}
          loopFillGroupWithBlank={true}
          loop={true}
          autoplay={{
            delay: 8000,
          }}
          breakpoints={{
            395: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="mySwiper">
          {popularData
            .slice(14, data.length - 1)
            .map(
              ({ id, name, images, price, discount, oldPrice, variants }) => {
                return (
                  <SwiperSlide key={id}>
                    <PopularCard
                      id={id}
                      price={price}
                      oldPrice={oldPrice}
                      name={name}
                      discount={discount}
                      images={images}
                      variants={variants}
                    />
                  </SwiperSlide>
                );
              }
            )}
        </Swiper>
      )}
    </Row>
  );
}

const mapStateToProps = (state) => ({
  popular: state.populars,
});

export default connect(mapStateToProps, {
  getPopulars,
})(PopularProducts);
