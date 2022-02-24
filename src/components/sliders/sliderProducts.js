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
  sliderTitle,
} from "./Slider.module.css";
import EmblaSlider from "../EmblaSlider";

export default function SliderProducts({ sliders }) {
  return (
    <EmblaSlider
      config={{
        skipSnaps: false,
        loop: true,
        draggable: true,
      }}>
      {sliders.map(
        (
          {
            pictureID,
            guidName,
            selectedText1,
            selectedText2,
            selectedTextButton,
            link,
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
                priority={i === 0}>
                <div className={slider__content}>
                  <h5 className="text-white fadeInUp wow text-uppercase text-shadow">
                    {selectedText1}
                  </h5>
                  <h2
                    className={`text-white fadeInUp wow text-uppercase text-shadow ${sliderTitle}`}
                    data-animation="fadeInUp"
                    data-delay=".4s">
                    {selectedText2}
                  </h2>
                  <Link
                    href={
                      link.toLowerCase().includes("newproducts")
                        ? "/shop/newproducts"
                        : "/shop/saleproducts"
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
