import React, { Component, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";

export default function SliderProducts() {
  const [images, setImages] = useState(null);
  const getImages = async () => {
    return await fetch("https://picsum.photos/v2/list?page=2&limit=100")
      .then((response) => response.json())
      .then((data) => setImages(data));
  };

  useEffect(() => getImages(), []);

  useEffect(() => console.log("images", images), [images]);

  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {Array.isArray(images) &&
        images.map((img) => (
          <SwiperSlide>
            <img src={img.download_url} width={400} height={600} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}
