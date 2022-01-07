import Link from "next/link";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Slider from "react-slick";
import sources from "../../../sources";
import { getBrand } from "../../redux/action/home";

const BrandSlider = ({ getBrand, noBg, customPadding, extraSection }) => {
  useEffect(() => {
    getBrand();
  }, []);
  const brand = useSelector((state) => state.home.brand);
  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,

        settings: {
          slidesToShow: 6,

          slidesToScroll: 1,

          infinite: true,
        },
      },

      {
        breakpoint: 991,

        settings: {
          slidesToShow: 6,

          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 767,

        settings: {
          slidesToShow: 4,

          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div
      className={` ${customPadding ? customPadding : "pt-100 pb-100"} ${
        noBg ? "" : "gray-bg"
      }`}>
      <div className="container select-colors">
        <Slider
          {...settings}
          className="row custom-row-10 product-active common-arrows">
          {brand &&
            brand.map((brand, i) => (
              <div className="col-12 opacity-100 h-25" key={i}>
                <div className="text-center select-colors">
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}>
                      <img
                        className="rounded-circle color-select"
                        src={`${sources.imageMinSrc}ae56bd13-d.jpg`}
                        alt="Brand"
                      />
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default connect(null, { getBrand })(BrandSlider);
