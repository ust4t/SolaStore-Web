import { Row } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../ProductCard";
import PopularCard from "../Cards/PopularCard";
import { getPopulars } from "../../redux/action/populars";
import { useQuery } from "react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import Preloader from "../../layout/Preloader";

function PopularProducts({ popular, getPopulars }) {
  const { isLoading, error, data } = useQuery("popularProducts", () =>
    fetch("/api/getPopulars").then((res) => res.json())
  );
  return (
    <Row className="popular-products">
      {isLoading ? (
        "Loading..."
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={5}
          loopFillGroupWithBlank={true}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="mySwiper">
          {data.map(({ id, name, images, price, discount, variants }) => {
            return (
              <SwiperSlide>
                <PopularCard
                  key={id}
                  id={id}
                  price={price}
                  name={name}
                  discount={discount}
                  images={images}
                  variants={variants}
                />
              </SwiperSlide>
            );
          })}
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

// export default PopularProducts;
