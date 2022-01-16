import React from "react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import sources from "../../../sources";
import styles from "./Slider.module.css";
import { HomePageSliderWithArrow } from "./HomePageSlider";

export default function SliderProducts({ sliders }) {
  return (
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
                            <Link
                              href={
                                selectedText1 === "İNDİRİMLİ ÜRÜNLER"
                                  ? "/shop/saleproducts"
                                  : "/shop/newproducts"
                              }>
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
  );
}
