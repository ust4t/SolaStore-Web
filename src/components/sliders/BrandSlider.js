import Link from "next/link";
import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import Slider from "react-slick";
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
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,

        settings: {
          slidesToShow: 4,

          slidesToScroll: 1,

          infinite: true,
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
    <div
      className={`brand-area ${
        customPadding ? customPadding : "pt-100 pb-100"
      } ${noBg ? "" : "gray-bg"}`}
    >
      <div className="container">
        {extraSection && (
          <div className="row">
            <div className="col-md-12">
              <div className="section-title-four mb-80">
                <h4>Shop By Brands</h4>
                <a href="#" className="common-link">
                  View All Brands <i className="fas fa-chevron-circle-right" />
                </a>
              </div>
            </div>
          </div>
        )}

        <Slider {...settings} className="row brand-active">
          {brand &&
            brand.map((brand, i) => (
              <div className="col-12" key={i}>
                <div className="bt-brand">
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <img src={brand} alt="Brand" />
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
