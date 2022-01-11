import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import axios from "axios";
import sources from "../../../sources";
import styles from "./Slider.module.css";
import Loader from "../Loader";
import { HomePageSliderWithArrow } from "./HomePageSlider";
import { StoreContext } from "../../context/StoreProvider";
import { useSelector } from "react-redux";

const fetchSlider = async (lang) => {
  const { data } = await axios.get(`/api/getSlider?lang=${lang}`);
  return data;
};

export default function SliderProducts() {
  const [images, setImages] = useState(null);
  const state = useSelector((state) => state.lang);
  const { isLoading, error, refetch } = useQuery(
    "slider",
    () => fetchSlider(state.lang),
    {
      onSuccess: ({ data }) => {
        setImages(data);
      },
      onError: (error) => {
        console.log(error);
        refetch();
      },
    }
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="hero-area position-relative ">
          <div className="hero-slider-two">
            <div className="slider-active slider-active-one">
              <HomePageSliderWithArrow sliders={images}>
                {Array.isArray(images) &&
                  images.map(
                    ({
                      pictureID,
                      guidName,
                      selectedText1,
                      selectedText2,
                      selectedTextButton,
                    }) => (
                      <div
                        key={pictureID}
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
      )}
    </>
  );
}
