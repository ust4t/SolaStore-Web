import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "react-query";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronBackOutline, ChevronForwardOutline } from "react-ionicons";

// import Swiper core and required modules
import { Autoplay, Navigation } from "swiper";
import axios from "axios";
import sources from "../../../sources";
import styles from "./Slider.module.css";
import Loader from "../Loader";

const fetchSlider = async () => {
  const { data } = await axios.get("/api/getSlider");
  return data;
};

export default function SliderProducts() {
  const [images, setImages] = useState(null);
  const { isLoading, error, refetch } = useQuery("slider", fetchSlider, {
    onSuccess: ({ data }) => {
      setImages(data);
    },
    onError: (error) => {
      console.log(error);
      refetch();
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={0}
          loop={true}
          centeredSlides={true}
          slidesPerView={1}
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
            images.map(
              ({
                pictureID,
                guidName,
                selectedText1,
                selectedText2,
                selectedTextButton,
              }) => (
                <SwiperSlide key={pictureID}>
                  <div
                    className={styles.sliderContainer}
                    style={{
                      backgroundImage: `url(${sources.slider}${guidName})`,
                    }}>
                    <div className={styles.innerContainer}>
                      <h6 className={styles.sliderSubtitle}>{selectedText1}</h6>
                      <h1 className={styles.sliderTitle}>{selectedText2}</h1>
                      <Link href="/">
                        <a
                          className={styles.sliderButton}
                          rel="noopener noreferrer">
                          {selectedTextButton}
                        </a>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          <div className={`prev ${styles.sliderArrow}`}>
            <ChevronBackOutline color={"#00000"} height="45px" width="45px" />
          </div>
          <div className={`next ${styles.sliderArrow}`}>
            <ChevronForwardOutline
              color={"#00000"}
              height="45px"
              width="45px"
            />
          </div>
        </Swiper>
      )}{" "}
    </>
  );
}
