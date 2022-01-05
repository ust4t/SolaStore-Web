import Link from "next/link";
import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import Product from "../src/components/product/Product";
import BrandSlider from "../src/components/sliders/BrandSlider";
import {
  HomePageProductSliderWithArrow,
  HomePageSliderWithSideArrow,
} from "../src/components/sliders/HomePageSlider";
import { Arrow } from "../src/components/sliders/SliderArrows";
import Layout from "../src/layout/Layout";
import { getHome3 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";

const Index3 = ({
  getHome3,
  sliders,
  bannerSlider,
  banner,
  products,
  getProducts,
}) => {
  useEffect(() => {
    getHome3();
    getProducts();
  }, []);

  var settings_1 = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    prevArrow: <Arrow icon="far fa-long-arrow-alt-left" />,
    nextArrow: <Arrow icon="far fa-long-arrow-alt-right" />,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Layout news={1} layout={2} darkBg>
      <main>
        <section className="hero-area position-relative">
          <div className="slider-three">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <HomePageSliderWithSideArrow sliders={sliders}>
                    {sliders &&
                      sliders.map((slide, i) => (
                        <div className="single-slider" key={i}>
                          <div className="hero-caption-three mt-75 mb-30">
                            <h2 data-animation="fadeInUp" data-delay=".4s">
                              {slide.title.split("/n").map((title, i) => (
                                <Fragment key={i}>
                                  {title} <br />
                                </Fragment>
                              ))}
                            </h2>
                          </div>
                          <div className="hero-three-img">
                            <img
                              src={slide.img}
                              className="img-fluid"
                              alt="Slider"
                            />
                          </div>
                        </div>
                      ))}
                  </HomePageSliderWithSideArrow>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="product-h-three pt-90 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title-three mb-30">
                  <h4>
                    Handpick Products
                    <span>Browse Top Collection Of Our Products.</span>
                  </h4>
                </div>
              </div>
            </div>
            <HomePageProductSliderWithArrow extraClass=" slider-active-three common-arrows ">
              {products &&
                products.map((product) => (
                  <div className="home_3_margin" key={product.id}>
                    <Product product={product} home3 />
                  </div>
                ))}
            </HomePageProductSliderWithArrow>
          </div>
        </section>
        <section className="banner-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-4 offset-xl-1 col-md-4">
                <div className="kitchen-wrapper">
                  <div className="kitchen-title text-center mb-25">
                    <h4>Kitchen Store</h4>
                  </div>
                  <Slider {...settings_1} className="kitchen-pro-active">
                    {bannerSlider &&
                      bannerSlider.map((banner, i) => (
                        <div className="kitchen-pro text-center" key={i}>
                          <div className="kitchen-img mb-30">
                            <Link href="/shop">
                              <a>
                                <img
                                  src={banner}
                                  className="img-fluid"
                                  alt="banner"
                                />
                              </a>
                            </Link>
                          </div>
                          <Link href="/shop">
                            <a className="sm-btn">All Product</a>
                          </Link>
                        </div>
                      ))}
                  </Slider>
                </div>
              </div>
              <div className="col-xl-6 offset-xl-1 col-md-8">
                <div className="product-banner product-banner-three text-center">
                  <Link href="/shop">
                    <a>
                      <img
                        src={banner && banner.img}
                        className="img-fluid"
                        alt="Banner"
                      />
                    </a>
                  </Link>
                  <div className="banner-text banner-text-three">
                    <span className="f-300">{banner && banner.text}</span>
                    <h3>
                      <Link href="/shop">
                        <a>{banner && banner.title}</a>
                      </Link>
                    </h3>
                    <Link href="/shop">
                      <a className="sm-btn">View Products</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-h-three pt-90">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title-three mb-30">
                  <h4>
                    Popular Furniture
                    <span>Most Favourite Products are Available!</span>
                  </h4>
                </div>
              </div>
            </div>
            <div className="row custom-row-10">
              {products &&
                products.map(
                  (product, i) =>
                    i <= 9 && (
                      <div
                        className="col-lg-3 col-sm-6 custom-col-10 custom-width-20"
                        key={product.id}
                      >
                        <Product product={product} />
                      </div>
                    )
                )}{" "}
            </div>
          </div>
        </section>
        <section className="newsletter-area pt-60">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div
                  className="news-wrapper news-wrapper-2 news-wrapper-3 text-center pt-140 pb-140"
                  data-background="img/all-bg/newsletter-bg-3.jpg"
                  style={{
                    backgroundImage: 'url("/img/all-bg/newsletter-bg-3.jpg")',
                  }}
                >
                  <h4 className="text-white">40% Flate On Subscription</h4>
                  <p className="text-white">
                    Lorem Ipsum is simply dummy texting of the printing and
                    typesettingig amet industry
                  </p>
                  <div className="news-form-wrapper news-form-wrapper-2 news-form-wrapper-3 mt-40 mb-10">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input type="email" placeholder="Email Address" />
                      <button type="submit">Subscribe</button>
                      <div className="checkbox d-flex justify-content-center mt-20">
                        <input type="checkbox" />
                        <span className="text-white">
                          I have read and agree to the terms &amp; conditions
                        </span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="product-h-three pt-90">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title-three mb-30">
                  <h4>
                    Chair Collection
                    <span>Browse Top Collection Of Our Products.</span>
                  </h4>
                </div>
              </div>
            </div>
            <HomePageProductSliderWithArrow extraClass="slider-active-three common-arrows">
              {products &&
                simpleProductFilter("chair", products).map((product) => (
                  <div className="home_3_margin" key={product.id}>
                    <Product product={product} home3 />
                  </div>
                ))}
            </HomePageProductSliderWithArrow>
          </div>
        </section>

        <BrandSlider noBg />
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  sliders: state.home.home3 && state.home.home3.sliders,
  bannerSlider: state.home.home3 && state.home.home3.bannerSlider,
  banner: state.home.home3 && state.home.home3.banner,
  products: simpleProductFilter("home_3", state.product.products),
});

export default connect(mapStateToProps, { getHome3, getProducts })(Index3);
