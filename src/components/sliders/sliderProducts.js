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

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };

  useEffect(() => getImages(), []);

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={pagination}
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
                width: "100%",
                height: "500px",
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
