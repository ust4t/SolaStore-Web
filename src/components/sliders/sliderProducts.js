import React, { Component, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import Swiper core and required modules
import { Autoplay, Pagination, Navigation } from "swiper";

// install Swiper modules
// SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function SliderProducts() {
  const [images, setImages] = useState(null);
  const getImages = async () => {
    return await fetch("https://picsum.photos/v2/list?page=2&limit=4")
      .then((response) => response.json())
      .then((data) => setImages(data));
  };

  useEffect(() => getImages(), []);

  return (
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={0}
      loop={true}
      centeredSlides={true}
      slidesPerView={3}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      navigation={{
        prevEl: ".prev",
        nextEl: ".next",
      }}
      className="mySwiper">
      {Array.isArray(images) &&
        images.map((img) => (
          <SwiperSlide>
            <img
              src={img.download_url}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "650px",
              }}
              layout="fill"
            />
          </SwiperSlide>
        ))}
      <div className="prev"></div>
      <div className="next"></div>
    </Swiper>
  );
}
