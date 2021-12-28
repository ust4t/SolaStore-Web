import { Row } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import PopularProducts from "../src/components/PopularProducts";
import Product from "../src/components/product/Product";
import BrandSlider from "../src/components/sliders/BrandSlider";
import {
  HomePageProductSliderWithArrow,
  HomePageSliderWithDot,
  HomePage_4SliderWithArrow,
} from "../src/components/sliders/HomePageSlider";
import SliderProducts from "../src/components/sliders/sliderProducts";
import Stories from "../src/components/Stories";
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
        <Stories />
        <SliderProducts />

        <PopularProducts />
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
                <Row style={{ display: "flex", justifyContent: "center" }}>
                  {iconSliders &&
                    iconSliders.map((icon, i) => (
                      <div
                        className="single-categories"
                        key={i}
                        style={{
                          marginLeft: 30,
                          marginRight: 30,
                          marginBottom: 10,
                        }}
                      >
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
                </Row>
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

        <section className="product-h-two pt-30 pb-30">
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
                      <div
                        className="col-lg-3 col-sm-6 custom-width-20"
                        key={i}
                      >
                        <Product product={product} />
                      </div>
                    )
                )}
            </div>
          </div>
        </section>
        <div className="container">
          <div className="col-lg-12 col-sm-8 m30">
            <div className="row">
              <div className="col-12 col-md-12">
                <h3 className="titlebrand">Markalar</h3>{" "}
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=4"
                    className="brand"
                  >
                    <img
                      src="img/brand/33a72a6d-1.jpg"
                      alt="CARLINO RICH"
                      title="CARLINO RICH"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=5"
                    className="brand"
                  >
                    <img
                      src="img/brand/aeaa88cb-f.jpg"
                      alt="CHARMING"
                      title="CHARMING"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=8"
                    className="brand"
                  >
                    <img
                      src="img/brand/1d6fdc46-2.jpg"
                      alt="DI'MAIN"
                      title="DI'MAIN"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=12"
                    className="brand"
                  >
                    <img
                      src="img/brand/49562052-1.jpg"
                      alt="LADİYYA"
                      title="LADİYYA"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=13"
                    className="brand"
                  >
                    <img
                      src="img/brand/3af4332a-1.jpg"
                      alt="LADYFORM"
                      title="LADYFORM"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=15"
                    className="brand"
                  >
                    <img
                      src="img/brand/31c5d1ee-6.jpg"
                      alt="LADYBIRD"
                      title="LADYBIRD"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=16"
                    className="brand"
                  >
                    <img
                      src="img/brand/33890cc0-6.jpg"
                      alt="LA JULYET"
                      title="LA JULYET"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=17"
                    className="brand"
                  >
                    <img
                      src="img/brand/904af0fa-1.jpg"
                      alt="LILIUM"
                      title="LILIUM"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=19"
                    className="brand"
                  >
                    <img
                      src="img/brand/b8fef8ba-5.jpg"
                      alt="MODALINDA"
                      title="MODALINDA"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=22"
                    className="brand"
                  >
                    <img
                      src="img/brand/221fb429-0.jpg"
                      alt="NARCİSSSE"
                      title="NARCİSSSE"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=24"
                    className="brand"
                  >
                    <img
                      src="img/brand/4714536f-5.jpg"
                      alt="NOMENS"
                      title="NOMENS"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=26"
                    className="brand"
                  >
                    <img
                      src="img/brand/c7707f15-4.jpg"
                      alt="SENASSA"
                      title="SENASSA"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=27"
                    className="brand"
                  >
                    <img
                      src="img/brand/b2c8e395-c.jpg"
                      alt="TESSY"
                      title="TESSY"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=28"
                    className="brand"
                  >
                    <img
                      src="img/brand/a2ec13ed-2.png"
                      alt="TREND UP"
                      title="TREND UP"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=29"
                    className="brand"
                  >
                    <img
                      src="img/brand/d90304ab-5.jpg"
                      alt="TOP WOMAN"
                      title="TOP WOMAN"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=30"
                    className="brand"
                  >
                    <img
                      src="img/brand/e8c2d440-5.png"
                      alt="VEGER"
                      title="VEGER"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=32"
                    className="brand"
                  >
                    <img
                      src="img/brand/c44607ff-6.jpg"
                      alt="LUANİ"
                      title="LUANİ"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=35"
                    className="brand"
                  >
                    <img
                      src="img/brand/d61f3b92-6.jpg"
                      alt="MAGRO"
                      title="MAGRO"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=36"
                    className="brand"
                  >
                    <img
                      src="img/brand/b6dc1162-a.png"
                      alt="ARAX"
                      title="ARAX"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=41"
                    className="brand"
                  >
                    <img
                      src="img/brand/de03a45f-a.png"
                      alt="M I S S D A Z Z L E"
                      title="M I S S D A Z Z L E"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=44"
                    className="brand"
                  >
                    <img
                      src="img/brand/56c257d2-1.png"
                      alt="ESTA LINE"
                      title="ESTA LINE"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=45"
                    className="brand"
                  >
                    <img
                      src="img/brand/3259b2f1-1.png"
                      alt="SAN VERA"
                      title="SAN VERA"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=46"
                    className="brand"
                  >
                    <img
                      src="img/brand/fb9bd309-0.png"
                      alt="VOLENTE"
                      title="VOLENTE"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=49"
                    className="brand"
                  >
                    <img
                      src="img/brand/d7578dbe-6.jpg"
                      alt="GOGO"
                      title="GOGO"
                    />
                  </a>
                </div>
              </div>
              <div className="col-4 col-md-2 brandborder">
                <div className="category-image">
                  <a
                    href="/Category/index?Type=Brand&BrandID=50"
                    className="brand"
                  >
                    <img
                      src="img/brand/0b17c2cd-c.jpg"
                      alt="LAWİN"
                      title="LAWİN"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
