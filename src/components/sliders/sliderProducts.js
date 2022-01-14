import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";
import { getLocalStorage } from "../../utils/localstorage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import sources from "../../../sources";
import styles from "./Slider.module.css";
import Loader from "../Loader";
import { HomePageSliderWithArrow } from "./HomePageSlider";

const fetchSlider = async (lang) => {
  const { data } = await axios.get(`/api/getSlider?lang=${lang}`);
  return data;
};

export default function SliderProducts({ sliders }) {
  // const [images, setImages] = useState(null);
  // const state = useSelector((state) => state.lang);
  // const { isLoading, error, refetch } = useQuery(
  //   "slider",
  //   () => fetchSlider(state),
  //   {
  //     onSuccess: ({ data }) => {
  //       setImages(data);
  //     },
  //     onError: (error) => {
  //       console.log(error);
  //       refetch();
  //     },
  //   }
  // );

  return (
    // <>
    //   {isLoading ? (
    //     <Loader />
    //   ) : (
    <section className="hero-area position-relative ">
      <div className="hero-slider-two">
        <div className="slider-active slider-active-one">
          <HomePageSliderWithArrow sliders={sliders}>
            {sliders &&
              sliders.map(
                (
                  {
                    pictureID,
                    guidName,
                    selectedText1,
                    selectedText2,
                    selectedTextButton,
                  },
                  i
                ) => (
                  <div
                    key={`${pictureID}_-_${i}`}
                    className="single-slider slider-height-two d-flex align-items-end bg-center-cover"
                    data-background={`${sources.slider}${guidName}`}>
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="hero-caption-two mb-85 d-flex flex-column align-items-center justify-content-center">
                            <h5
                              className={`text-white fadeInUp wow text-uppercase text-shadow`}
                              data-animation="fadeInUp"
                              data-delay=".2s">
                              {selectedText1}
                            </h5>
                            <h2
                              className={`text-white fadeInUp wow text-uppercase text-shadow`}
                              data-animation="fadeInUp"
                              data-delay=".4s">
                              {selectedText2}
                            </h2>
                            <Link href="/">
                              <a
                                className={`${styles.sliderButton} w-25`}
                                rel="noopener noreferrer">
                                {selectedTextButton}
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
          </HomePageSliderWithArrow>
        </div>
      </div>
    </section>
    //   )}
    // </>
  );
}
