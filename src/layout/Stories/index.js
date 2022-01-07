import { Row } from "antd";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import BrandSlider from "../../components/sliders/BrandSlider";

import sources from "../../../sources";
function Stories() {
  return (
    // <div className="select-colors  d-flex align-items-center justify-content-center">
    //   <Swiper
    //     style={{
    //       padding: "0 60px",
    //     }}
    //     modules={[Autoplay, Navigation]}
    //     spaceBetween={0}
    //     centeredSlides={true}
    //     slidesPerView={6}
    //     // navigation
    //     autoplay={{
    //       delay: 6000,
    //     }}
    //     breakpoints={{
    //       320: {
    //         slidesPerView: 3,
    //       },
    //       768: {
    //         slidesPerView: 3,
    //       },
    //       1024: {
    //         slidesPerView: 6,
    //       },
    //     }}>
    //     {[1, 2, 3, 4, 5, 6].map((variant, i) => (
    //       <SwiperSlide>
    //         <div
    //           className="story-circle"
    //           style={{
    //             width: "95px",
    //             height: "95px",
    //             cursor: "pointer",
    //             margin: "10px",
    //           }}>
    //           <img
    //             key={`${i}__`}
    //             className="color-select "
    //             width={80}
    //             height={80}
    //             src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
    //             priority={true}
    //           />
    //         </div>
    //       </SwiperSlide>
    //     ))}
    //   </Swiper>
    // </div>
    <div className="w-100">
      <div
        style={{
          width: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          centeredSlides={true}
          slidesPerView={6}
          // navigation
          autoplay={{
            delay: 6000,
          }}>
          {[1, 2, 3, 4, 5, 6].map((variant, i) => (
            <SwiperSlide>
              <img
                key={`${i}__`}
                className="color-select"
                width={60}
                height={60}
                src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
    // <BrandSlider customPadding="pt-70" noBg />
  );
}

export default Stories;
