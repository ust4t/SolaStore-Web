import Link from "next/link";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import BrandSlider from "../src/components/sliders/BrandSlider";
import VideoPopUp from "../src/components/VideoPopUp";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { dataImage } from "../src/utils/utils";

const About = () => {
  const [popup, setPopup] = useState(false);
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(() => {
    dataImage();
  }, []);
  return (
    <Layout>
      <main>
        <PageTitle active="About" pageTitle="About Us" />
        {popup && (
          <VideoPopUp
            video="https://www.youtube.com/embed/I3u3lFA9GX4"
            closePopup={() => setPopup(false)}
          />
        )}
        <section className="about-area pt-120 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-5">
                <div className="about-left-side pos-rel mb-30">
                  <div className="about-front-img pos-rel">
                    <img src="/img/all-bg/about-img.jpg" alt="About" />
                    <a
                      className="popup-video about-video-btn white-video-btn"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPopup(true);
                      }}
                    >
                      <i className="fas fa-play" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-7">
                <div className="about-right-side pt-30 mb-30">
                  <div className="section-title mb-20">
                    <span>About Us</span>
                    <h4>
                      Short Story About <br /> Retro Team.
                    </h4>
                  </div>
                  <div className="about-text mb-50">
                    <p>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco
                      laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                      irure dolor in reprehenderit in voluptate velit esse
                      cillum dolore eu fugiat nulla pariatur. Excepteur sint
                      occaecat reprehenderit in voluptate cupidatat non
                      proident, sunt in culpa qui officia.
                    </p>
                  </div>
                  <div className="our-destination">
                    <div className="single-item mb-30">
                      <div className="mv-icon f-left">
                        <i className="fal fa-edit" />
                      </div>
                      <div className="mv-title fix">
                        <h3>Our Mission</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit
                          reprehenderit in voluptate.
                        </p>
                      </div>
                    </div>
                    <div className="single-item">
                      <div className="mv-icon f-left">
                        <i className="fal fa-gem" />
                      </div>
                      <div className="mv-title fix">
                        <h3>Our Vission</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit
                          reprehenderit in voluptate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* about-area end */}
        {/* features area start */}
        <section className="features-area gray-bg features-area-border p-relative pb-70 pt-100 box-105">
          <div className="container features__wrapper">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div className="section-title text-center mb-40">
                  <span>Feathures</span>
                  <h4>Why Shop From Us.</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
                  <div className="features__icon">
                    <i className="fal fa-shipping-fast" />
                  </div>
                  <div className="features__content">
                    <h3>FREE SHIPPING</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      sed dole there eiusm tempor magna aliqua denim.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
                  <div className="features__icon">
                    <i className="fal fa-headset" />
                  </div>
                  <div className="features__content">
                    <h3>24/7 SUPPORT</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      sed dole there eiusm tempor magna aliqua denim.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="features__item d-flex white-bg transition-3 border-radius-8 box-shadow mb-30">
                  <div className="features__icon">
                    <i className="fal fa-undo-alt" />
                  </div>
                  <div className="features__content">
                    <h3>EASY RETURN</h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      sed dole there eiusm tempor magna aliqua denim.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* features area end */}
        <div className="team-area pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                <div className="section-title text-center mb-40">
                  <span>Members</span>
                  <h4>Team Members.</h4>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3 col-sm-6">
                <div className="bt-team text-center mb-30">
                  <div className="team-img">
                    <img src="/img/team/team-member-01.jpg" alt="About" />
                    <div className="team-social">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="mb-30" />
                  <div className="team-info">
                    <h3>Donald T.Benjamin</h3>
                    <span>Head of Innovation</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="bt-team text-center mb-30">
                  <div className="team-img">
                    <img src="/img/team/team-member-07.jpg" alt="About" />
                    <div className="team-social">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="mb-30" />
                  <div className="team-info">
                    <h3>Donald T.Benjamin</h3>
                    <span>Head of Innovation</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="bt-team text-center mb-30">
                  <div className="team-img">
                    <img src="/img/team/team-member-03.jpg" alt="About" />
                    <div className="team-social">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="mb-30" />
                  <div className="team-info">
                    <h3>Donald T.Benjamin</h3>
                    <span>Head of Innovation</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-sm-6">
                <div className="bt-team text-center mb-30">
                  <div className="team-img">
                    <img src="/img/team/team-member-04.jpg" alt="About" />
                    <div className="team-social">
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin" />
                      </a>
                      <a href="#" onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                  </div>
                  <div className="mb-30" />
                  <div className="team-info">
                    <h3>Jotaton Doese</h3>
                    <span>Head Developer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* cta-area start */}
        <section
          className="cta-area pos-rel pt-115 pb-120"
          data-background="img/all-bg/newsletter-bg-3.jpg"
        >
          <div className="container" style={{ position: "inherit" }}>
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div className="cta-text text-center">
                  <div className="section-title section-title-white text-center mb-40">
                    <span>All the best item for You</span>
                    <h4>
                      Trust Us To Be There To Help All &amp; Make Things Well
                      Again.
                    </h4>
                  </div>
                  <div className="section-button">
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                        className="bt-btn bt-btn-white"
                      >
                        get a consultant
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* cta-area end */}
        {/* testimonial-area-start */}
        <div className="testimonial-area pt-110">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="section-title text-center mb-80">
                  <span>testimonials</span>
                  <h1>Happy Clients Says</h1>
                </div>
              </div>
            </div>
          </div>
          <div
            className="testimonial pb-160"
            style={{ backgroundImage: "url(img/all-bg/test.png)" }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-8 col-lg-8 offset-lg-2 offset-xl-2">
                  <Slider
                    {...settings}
                    className="testimonial-active owl-carousel"
                  >
                    <div className="testimonial-wrapper text-center">
                      <div className="testimonial-img">
                        <img src="/img/testimonial/test.png" alt="About" />
                      </div>
                      <div className="testimonial-text">
                        <h3>Johan D. William</h3>
                        <span>Founder at UIhub</span>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-wrapper text-center">
                      <div className="testimonial-img">
                        <img src="/img/testimonial/test.png" alt="About" />
                      </div>
                      <div className="testimonial-text">
                        <h3>Johan D. William</h3>
                        <span>Founder at UIhub</span>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-wrapper text-center">
                      <div className="testimonial-img">
                        <img src="/img/testimonial/test.png" alt="About" />
                      </div>
                      <div className="testimonial-text">
                        <h3>Johan D. William</h3>
                        <span>Founder at UIhub</span>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                    <div className="testimonial-wrapper text-center">
                      <div className="testimonial-img">
                        <img src="/img/testimonial/test.png" alt="About" />
                      </div>
                      <div className="testimonial-text">
                        <h3>Johan D. William</h3>
                        <span>Founder at UIhub</span>
                        <p>
                          {" "}
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* testimonial-area-end */}
        <BrandSlider customPadding="pt-80 pb-80" />
      </main>
    </Layout>
  );
};

export default About;
