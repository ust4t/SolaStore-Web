import Link from "next/link";
import { useEffect } from "react";
import { connect } from "react-redux";
import Home5ProductTab from "../src/components/product/Home5ProductTab";
import Product from "../src/components/product/Product";
import BrandSlider from "../src/components/sliders/BrandSlider";
import {
  HomePage5UpcomingSlider,
  HomePageSliderWithDot,
} from "../src/components/sliders/HomePageSlider";
import Layout from "../src/layout/Layout";
import { getBlog } from "../src/redux/action/blog";
import { getHome5 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import { animationCreate } from "../src/utils/utils";

const Index5 = ({
  sliders,
  getHome5,
  banner,
  banner_2,
  getProducts,
  blogs,
  products,
  getBlog,
}) => {
  useEffect(() => {
    getHome5();
    getProducts();
    getBlog();
    animationCreate();
  }, []);

  return (
    <Layout news={5} layout={3} footer={1}>
      <main>
        <section className="hero-area position-relative mb-30">
          <div className="slider-five">
            <HomePageSliderWithDot sliders={sliders}>
              {sliders &&
                sliders.map((slide, i) => (
                  <div
                    key={i}
                    className="single-slider slider-height-five d-flex align-items-center"
                    data-background={slide.img}
                  >
                    <div className="container">
                      <div className="row">
                        <div className="col-xl-6 col-lg-8">
                          <div className="slider-text-five">
                            <span className="wow fadeInUp" data-delay=".2s">
                              {slide.subTitle}
                            </span>
                            <h2 className="wow fadeInUp" data-delay=".3s">
                              {slide.title}
                            </h2>
                            <p className="wow fadeInUp" data-delay=".4s">
                              {slide.text}
                            </p>
                            <div className="wow fadeInUp" data-delay=".5s">
                              <Link href="#">
                                <a
                                  onClick={(e) => {
                                    e.preventDefault();
                                  }}
                                  className="sli-five-btn"
                                >
                                  Go To Collection
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </HomePageSliderWithDot>
          </div>
        </section>
        <section className="banner-area common-space-5">
          <div className="container-fluid">
            <div className="row">
              {banner &&
                banner.map((banner, i) => (
                  <div className="col-lg-4 col-12" key={i}>
                    <div className="fruit-banner  mb-30">
                      <div className="fruit-banner-img">
                        <Link href="/shop">
                          <a>
                            <img
                              src={banner.img}
                              className="img-fluid"
                              alt="Banner Image"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="fruit-banner-text">
                        <span>{banner.name}</span>
                        <h5>
                          <Link href="#">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {banner.title}
                            </a>
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
        <Home5ProductTab products={products} />
        <section
          className="fruit-service common-space-5 pt-90"
          data-background="img/all-bg/service-five-bg.jpg"
        >
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title-five text-center pb-85">
                  <span>Features of Our Vegetable &amp; Fruits</span>
                  <h4>We Are 100% Organic</h4>
                </div>
              </div>
            </div>
            <div className="row mb-45">
              <div className="col-lg-4 col-sm-12">
                <div className="single-fruit-service single-fruit-service-right mb-30">
                  <div className="fruit-service-text mb-70">
                    <div className="service-icon">
                      <i className="fal fa-salad" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>Best Quality Product</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                  <div className="fruit-service-text mb-70">
                    <div className="service-icon">
                      <i className="fal fa-apple-alt" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>Rich Fruit Guarantee</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                  <div className="fruit-service-text">
                    <div className="service-icon">
                      <i className="fal fa-turkey" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>Always Fresh &amp; New</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="fruit-service-img mb-30">
                  <img
                    src="/img/product/service-fruit-product.png"
                    className="img-fluid"
                    alt="Product"
                  />
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="single-fruit-service mb-30">
                  <div className="fruit-service-text mb-70">
                    <div className="service-icon">
                      <i className="fal fa-salad" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>Healthy &amp; Organic</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                  <div className="fruit-service-text mb-70">
                    <div className="service-icon">
                      <i className="fal fa-pumpkin" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>100% Natural Product</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                  <div className="fruit-service-text">
                    <div className="service-icon">
                      <i className="fal fa-turkey" />
                    </div>
                    <div className="service-content">
                      <h5>
                        <Link href="/shop">
                          <a>Discount Available</a>
                        </Link>
                      </h5>
                      <p>
                        Lorem ipsum dolor sit amet, consectuer adipiscing elit,
                        sed diam nonummy.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BrandSlider customPadding="brand-border" noBg />
        </section>

        <section className="product-area pt-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
                <div className="product-five-title mt-45 mb-30">
                  <div className="section-title-five">
                    <span>All the best item for You</span>
                    <h4>Discover Deals Of The Week</h4>
                  </div>
                  <Link href="/shop">
                    <a className="sli-five-btn">View All Deals</a>
                  </Link>
                </div>
              </div>
              <div className="col-lg-9">
                <HomePage5UpcomingSlider extraClass=" slider-active-three common-arrows">
                  {products &&
                    products.map(
                      (product, i) =>
                        product.upComeing && (
                          <div className="home_5_margin">
                            <Product product={product} home5 notHover key={i} />
                          </div>
                        )
                    )}
                </HomePage5UpcomingSlider>
              </div>
            </div>
          </div>
        </section>

        <section className="banner-area pt-65">
          <div className="container">
            <div className="row">
              {banner_2 &&
                banner_2.map((banner, i) => (
                  <div className="col-lg-6" key={i}>
                    <div className="fruit-banner2 mb-30">
                      <div className="fruit-banner-img2">
                        <Link href="/shop">
                          <a>
                            <img
                              src={banner.img}
                              className="img-fluid"
                              alt="Banner Img"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="fruit-banner-text2">
                        <span>{banner.subTitle}</span>
                        <h5>
                          <Link href="#">
                            <a
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              {banner.title}
                            </a>
                          </Link>
                        </h5>
                        <p>{banner.text}</p>
                        <Link href="/shop">
                          <a className="sm-btn fruit-banner-btn">Shop Now</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="fruit-blog pt-65 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="section-title-five text-center pb-35">
                  <span>All the best item for You</span>
                  <h4>Popular Blog Post</h4>
                </div>
              </div>
            </div>
            <div className="row">
              {blogs &&
                blogs.map(
                  (blog, i) =>
                    blog.subTitle && (
                      <div className="col-lg-4 col-md-6" key={i}>
                        <div className="fruit-blog-wrapper mb-30">
                          <div className="fruit-blog-img mb-20">
                            <Link href={`/blog/${blog.id}`}>
                              <a>
                                <img
                                  src={blog.img}
                                  className="img-fluid"
                                  alt="Blog"
                                />
                              </a>
                            </Link>
                          </div>
                          <div className="fruit-blog-text">
                            <h5>
                              <Link href={`/blog/${blog.id}`}>
                                <a>{blog.title}</a>
                              </Link>
                            </h5>
                            <span>{blog.subTitle}</span>
                            <p>
                              Space. The final frontier. These are the voyage of
                              Starsh Enterprise. Here’s the story of a lovely
                              lady who bringing up three very lovely girls.
                            </p>
                            <Link href={`/blog/${blog.id}`}>
                              <a className="fruit-blog-link">
                                <span />
                                <span />
                                <span />
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  sliders: state.home.home5 && state.home.home5.sliders,
  banner: state.home.home5 && state.home.home5.banner,
  banner_2: state.home.home5 && state.home.home5.banner_2,
  products: simpleProductFilter("home_5", state.product.products),
  blogs: state.blog.blogs,
});
export default connect(mapStateToProps, { getHome5, getProducts, getBlog })(
  Index5
);
