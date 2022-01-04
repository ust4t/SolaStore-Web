import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import Product from "../src/components/product/Product";
import BrandSlider from "../src/components/sliders/BrandSlider";
import {
  HomePageProductSliderWithArrow,
  HomePageSliderWithDot,
  HomePage_4SliderWithArrow,
} from "../src/components/sliders/HomePageSlider";
import Layout from "../src/layout/Layout";
import { getHome4 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import time from "../src/utils/time";
import { animationCreate, splitText } from "../src/utils/utils";

const Index4 = ({
  getHome4,
  sliders,
  banner_1,
  iconSliders,
  banner_2,
  banner_3,
  getProducts,
  products,
}) => {
  useEffect(() => {
    getHome4();
    getProducts();
    animationCreate();
  }, []);

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <section className="hero-area position-relative">
          <div className="slider-four">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 col-12 custom-width-70">
                  <HomePageSliderWithDot
                    sliders={sliders}
                    extraClass="slider-active slider-active-four common-dots"
                  >
                    {sliders &&
                      sliders.map((slide, i) => (
                        <div
                          key={i}
                          className="single-slider slider-height-four d-flex align-items-center"
                          data-background={slide.img}
                        >
                          <div className="hero-caption-four ml-50">
                            <div
                              className="sli-offer mb-15 wow fadeInUp"
                              data-animation="fadeInUp"
                              data-delay=".2s"
                            >
                              <span>{slide.valueChange}%</span>
                              <span>{slide.status}</span>
                            </div>
                            <h2 dclass="wow fadeInUp" data-delay=".4s">
                              {slide.title}
                            </h2>
                            <p dclass="wow fadeInUp" data-delay=".6s">
                              {slide.text}
                            </p>
                            <a
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              className="common-link fadeInUp wow"
                              data-animation="fadeInUp"
                              data-delay=".8s"
                            >
                              Start Shopping
                              <i className="fas fa-chevron-circle-right" />
                            </a>
                          </div>
                        </div>
                      ))}
                  </HomePageSliderWithDot>
                </div>
                <div className="col-lg-4 custom-width-30 d-none d-lg-block">
                  {banner_1 &&
                    banner_1.map((banner, i) => (
                      <div
                        className={`sli-banner ${
                          banner_1 && banner_1.length !== i ? "mb-30" : ""
                        }`}
                        key={i}
                      >
                        <img
                          src={banner.img}
                          className="img-fluid"
                          alt="Banner"
                        />
                        <div className="sli-banner-text">
                          <h5 className="f-700">{banner.title}</h5>
                          <span>{banner.text}</span>
                          <Link href="/shop">
                            <a className="common-link">
                              buy now{" "}
                              <i className="fas fa-chevron-circle-right" />
                            </a>
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              {/*extra banner for responsive*/}
              <div className="row">
                <div className="col-md-6 d-md-block d-lg-none">
                  <div className="sli-banner mt-30">
                    <img
                      src="/img/slider/slider-banner-1.jpg"
                      className="img-fluid"
                      alt
                    />
                    <div className="sli-banner-text">
                      <h5 className="f-700">Medical Tools Steam Vipozer</h5>
                      <span>Free Shipping Now!</span>
                      <Link href="/shop">
                        <a className="common-link">
                          buy now <i className="fas fa-chevron-circle-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 d-md-block d-lg-none">
                  <div className="sli-banner mt-30">
                    <img
                      src="/img/slider/slider-banner-2.jpg"
                      className="img-fluid"
                      alt
                    />
                    <div className="sli-banner-text">
                      <h5 className="f-700">Hight Quality Hand Sanitizer</h5>
                      <span>Get Upto 60% OFF</span>
                      <Link href="/shop">
                        <a className="common-link">
                          buy now <i className="fas fa-chevron-circle-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/*extra banner for responsive*/}
            </div>
          </div>
        </section>
        <section className="categories-slider pt-80 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <HomePage_4SliderWithArrow extraClass="categories-active common-arrows">
                  {iconSliders &&
                    iconSliders.map((icon, i) => (
                      <div className="single-categories" key={i}>
                        <a href="#">
                          <div className="icon gray-bg-icon">
                            <i className={`fal fa-${icon.icon}`} />
                          </div>
                        </a>
                        <h6>
                          <a href="#">{icon.text}</a>
                        </h6>
                      </div>
                    ))}
                </HomePage_4SliderWithArrow>
              </div>
            </div>
          </div>
        </section>
        <section className="banner-area banner-four">
          <div className="container">
            <div className="row">
              {banner_2 &&
                banner_2.map((banner, i) => (
                  <div className="col-lg-6 col-12 custom-width-50" key={i}>
                    <div className="medical-banner mb-30">
                      <Link href="/shop">
                        <a>
                          <img
                            src={banner.img}
                            className="img-fluid"
                            alt="Banner"
                          />
                        </a>
                      </Link>
                      <div className="medical-banner-text">
                        <h5>N95 Face Mask Multilayer Protect</h5>
                        <span>Easy And Free Returns!</span>
                        <span className="m-price">
                          $ {splitText(banner.price, ".")[0]}
                          <sup>.{splitText(banner.price, ".")[1]}</sup>
                        </span>
                        <Link href="/shop">
                          <a className="common-link">
                            View more
                            <i className="fas fa-chevron-circle-right" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="product-h-two pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title text-center pb-45">
                  <h4 className="f-700">Trending Products</h4>
                  <span>
                    Street art salvia irony wolf waistcoat actually lomo meh fap
                    jean shorts.
                  </span>
                </div>
              </div>
            </div>
            <HomePageProductSliderWithArrow extraClass="slider-active-three common-arrows ">
              {products &&
                products.map((product) => (
                  <div className="home_3_margin" key={product.id}>
                    <Product product={product} />
                  </div>
                ))}{" "}
            </HomePageProductSliderWithArrow>
          </div>
        </section>
        <section
          className="countdown-area pt-125 pb-120"
          data-background={banner_3 && banner_3.img}
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-4 offset-xl-8 col-lg-5 offset-lg-7 col-md-8 offset-md-4 custom-width-40">
                <div className="countdown-wrapper hero-caption-four">
                  <div className="sli-offer mb-15">
                    <span>{banner_3 && banner_3.value}%</span>
                    <span>{banner_3 && banner_3.status}</span>
                  </div>
                  <h2>{banner_3 && banner_3.title}</h2>
                  <p>{banner_3 && banner_3.text}</p>
                  <div className="product-countdown mb-40">
                    <div className="time-count-deal">
                      <div className="countdown-list">
                        <div className="time-count">
                          {time(banner_3 && banner_3.date).days}{" "}
                          <span>days</span>
                        </div>
                        <div className="time-count">
                          {time(banner_3 && banner_3.date).hours}{" "}
                          <span>hour</span>
                        </div>
                        <div className="time-count">
                          {time(banner_3 && banner_3.date).minutes}{" "}
                          <span>minute</span>
                        </div>
                        <div className="time-count">
                          {time(banner_3 && banner_3.date).seconds}{" "}
                          <span>Second</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="common-link"
                    >
                      Deal of the day
                      <i className="fas fa-chevron-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-area pt-95">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title-four mb-15">
                  <h4>Best Selling Items</h4>
                  <a href="#" className="common-link">
                    Deal of the day{" "}
                    <i className="fas fa-chevron-circle-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              {products &&
                products.map(
                  (product, i) =>
                    i < 3 && (
                      <div
                        className="col-lg-3 col-sm-6 custom-width-20"
                        key={i}
                      >
                        <Product product={product} />
                      </div>
                    )
                )}{" "}
              <div className="col-lg-6 col-12 custom-width-40 medical-pro-width">
                <div className="medical-banner medical-pro-banner mb-30">
                  <Link href="/shop">
                    <a>
                      <img
                        src="img/banner/banner-img-11.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="medical-banner-text">
                    <h5>Cara Portable Compressor Air</h5>
                    <span>Easy And Free Returns!</span>
                    <span className="m-price f-300">
                      $ 145<sup>.00</sup>
                      <del>
                        $ 165<sup>.00</sup>
                      </del>
                    </span>
                    <Link href="/shop">
                      <a className="common-link">
                        View more
                        <i className="fas fa-chevron-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-area pt-55">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title-four mb-15">
                  <h4>Top Featured Products</h4>
                  <a href="#" className="common-link">
                    Deal of the day{" "}
                    <i className="fas fa-chevron-circle-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 custom-width-40 medical-pro-width">
                <div className="medical-banner medical-pro-banner mb-30">
                  <Link href="/shop">
                    <a>
                      <img
                        src="img/banner/banner-img-12.jpg"
                        className="img-fluid"
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="medical-banner-text">
                    <h5>Air Thermometer Reading Digital</h5>
                    <span>Easy And Free Returns!</span>
                    <span className="m-price f-300">
                      $ 145<sup>.00</sup>
                      <del>
                        $ 165<sup>.00</sup>
                      </del>
                    </span>
                    <Link href="/shop">
                      <a className="common-link">
                        View more
                        <i className="fas fa-chevron-circle-right" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              {products &&
                products.map(
                  (product, i) =>
                    i >= 3 &&
                    i <= 6 && (
                      <div className="col-lg-3 col-sm-6 custom-width-20">
                        <Product product={product} />
                      </div>
                    )
                )}
            </div>
          </div>
        </section>

        <BrandSlider extraSection noBg customPadding="pt-50 pb-90" />
        <section
          className="discover-four pt-110 pb-115"
          data-background="img/discover/discover-four-bg.jpg"
        >
          <div className="container">
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-8 col-12 custom-width-40">
                <div className="dis-four-text">
                  <div className="section-title">
                    <h4 className="f-700">
                      Grade A Safety Masks For Sale. Hurry Up!
                    </h4>
                    <p>
                      Ut ultricies imperdiet sodales. Aliquam fringilla aliquam
                      exs it amet elementum. Proin bibendum feugiat simplifies.
                    </p>
                  </div>
                  <ul className="mb-25">
                    <li>
                      <img src="/img/discover/dis-four-1.png" al="Banner" />
                      Express Delivery
                    </li>
                    <li className="ml-45">
                      <img src="/img/discover/dis-four-2.png" al="Banner" />
                      Premium Packaging
                    </li>
                    <li>
                      <img src="/img/discover/dis-four-3.png" al="Banner" />
                      Safe Payment
                    </li>
                    <li className="ml-65">
                      <img src="/img/discover/dis-four-4.png" al="Banner" />
                      Friendly Services
                    </li>
                  </ul>
                  <Link href="#">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="common-link"
                    >
                      Discover More{" "}
                      <i className="fas fa-chevron-circle-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  sliders: state.home.home4 && state.home.home4.sliders,
  banner_1: state.home.home4 && state.home.home4.banner_1,
  iconSliders: state.home.home4 && state.home.home4.iconSliders,
  banner_2: state.home.home4 && state.home.home4.banner_2,
  banner_3: state.home.home4 && state.home.home4.banner_3,
  products: simpleProductFilter("home_4", state.product.products),
});

export default connect(mapStateToProps, { getHome4, getProducts })(Index4);
