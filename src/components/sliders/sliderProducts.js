import React from "react";
import Link from "next/link";

import BackgroundImage from "../BackgroundImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import sources from "../../../sources";

import {
  embla__slide,
  embla__slide__inner,
  embla__slide__img,
  sliderButton,
  slider__content,
} from "./Slider.module.css";
// import { HomePageSliderWithArrow } from "./HomePageSlider";
import EmblaSlider from "../EmblaSlider";
// import Image from "next/image";

export default function SliderProducts({ sliders }) {
  return (
    <EmblaSlider
      config={{
        skipSnaps: false,
        loop: true,
      }}>
      {sliders.map(
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
          <div className={embla__slide} key={`${pictureID}_-_${i}`}>
            <div className={embla__slide__inner}>
              {/* <img
                className={embla__slide__img}
                src={`${sources.slider}${guidName}`}
                alt="Solastore"
              /> */}
              <BackgroundImage
                className={embla__slide__img}
                src={`${sources.slider}${guidName}`}
                objectFit="cover"
                objectPosition="center"
                layout="fill"
                quality={100}
                priority={true}>
                <div className={slider__content}>
                  <h5 className="text-white fadeInUp wow text-uppercase text-shadow">
                    {selectedText1}
                  </h5>
                  <h2
                    className="text-white fadeInUp wow text-uppercase text-shadow"
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
                      className={`${sliderButton} w-25`}
                      rel="noopener noreferrer">
                      {selectedTextButton}
                    </a>
                  </Link>
                </div>
              </BackgroundImage>
            </div>
          </div>
        )
      )}
    </EmblaSlider>
  );
}
