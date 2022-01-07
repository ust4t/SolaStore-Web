import { useEffect } from "react";
import Slider from "react-slick";
import { dataImage } from "../../utils/utils";
import { Arrow } from "./SliderArrows";
export const HomePageSliderWithArrow = ({ sliders, children, extraClass }) => {
  useEffect(() => {
    dataImage();
  }, [sliders]);

  var settings = {
    autoplay: true,
    autoplaySpeed: 5000,
    dots: false,
    fade: true,
    cssEase: "linear",
    prevArrow: <Arrow icon="fas fa-arrow-left" />,
    nextArrow: <Arrow icon="fas fa-arrow-right" />,
    arrows: true,
  };
  return (
    <Slider className={`${extraClass ? extraClass : ""}`} {...settings}>
      {children}
    </Slider>
  );
};
export const HomePageSliderWithDot = ({ sliders, children, extraClass }) => {
  useEffect(() => {
    dataImage();
  }, [sliders]);

  let settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider
      {...settings}
      className={
        extraClass
          ? extraClass
          : "slider-active slider-active-five common-dots common-space-5"
      }>
      {children}
    </Slider>
  );
};
export const HomePageSliderWithSideArrow = ({ sliders, children }) => {
  useEffect(() => {
    dataImage();
  }, [sliders]);

  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="far fa-long-arrow-alt-right" text="prev" />,
    nextArrow: <Arrow icon="far fa-long-arrow-alt-left" text="next" />,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings} className="slider-active-three common-arrows">
      {children}
    </Slider>
  );
};

export const HomePage_1SliderWithArrow = ({
  sliders,
  children,
  extraClass,
}) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="fas fa-arrow-left" />,
    nextArrow: <Arrow icon="fas fa-arrow-right" />,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider
      {...settings}
      className={extraClass ? extraClass : "dis-img-active"}>
      {children}
    </Slider>
  );
};

export const HomePage_4SliderWithArrow = ({ children, extraClass }) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="fal fa-chevron-left" />,
    nextArrow: <Arrow icon="fal fa-chevron-right" />,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 6, slidesToScroll: 1, infinite: true },
      },
      { breakpoint: 991, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 575, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <Slider
      {...settings}
      className={extraClass ? extraClass : "dis-img-active"}>
      {children}{" "}
    </Slider>
  );
};

export const HomePageProductSliderWithArrow = ({ children, extraClass }) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="fas fa-arrow-left" />,
    nextArrow: <Arrow icon="fas fa-arrow-right" />,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 420, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  return (
    <Slider
      {...settings}
      className={
        extraClass
          ? extraClass
          : "row custom-row-10 product-active common-arrows"
      }>
      {children}
    </Slider>
  );
};
export const HomePage5UpcomingSlider = ({ children, extraClass }) => {
  let settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="far fa-long-arrow-alt-left" text="prev" />,
    nextArrow: <Arrow icon="far fa-long-arrow-alt-right" text="next" />,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 991, settings: { slidesToShow: 2 } },
      { breakpoint: 767, settings: { slidesToShow: 1 } },
    ],
  };
  return (
    <Slider
      {...settings}
      className={
        extraClass ? extraClass : "row product-deals-five-active common-arrows"
      }>
      {children}
    </Slider>
  );
};

const HomeBrandSlider = ({ children }) => {
  let settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,

        settings: {
          slidesToShow: 6,

          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 991,

        settings: {
          slidesToShow: 4,

          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 767,

        settings: {
          slidesToShow: 2,

          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={"brand-area"}>
      <div className="container">
        <Slider {...settings} className="row brand-active">
          {children}
        </Slider>
      </div>
    </div>
  );
};

export { HomeBrandSlider };
