import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
const Contact = () => {
  return (
    <Layout sticky>
      <main>
        <PageTitle active="Contact" pageTitle="Contact" />

        <section className="contact__area pt-120 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-xl-5 col-lg-5">
                <div className="contact__info-head mb-40">
                  <div className="section-title mb-20">
                    <span>Contact info</span>
                    <h4>
                      Have Any Questins Or Emergency Problem Contact With Us.
                    </h4>
                  </div>
                  <p>
                    Pulvinar senectus morbi quisque nunc to towa faucibus netus
                    etiam mone lestie nisi dis malesuada maecenas ora pretium
                    ornare pharetra vestibulum mattis fringilla interdum cursus
                    curae nisi pede laoreet placerat{" "}
                  </p>
                </div>
              </div>
              <div className="col-xl-6 offset-xl-1 col-lg-6 offset-lg-1">
                <div className="contact__form">
                  <form id="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="row">
                      <div className="col-xl-6">
                        <input
                          name="name"
                          className="contact__input contact__input-3 contact__input-4"
                          type="text"
                          placeholder="Your Name"
                        />
                      </div>
                      <div className="col-xl-6">
                        <input
                          name="email"
                          className="contact__input contact__input-3 contact__input-4"
                          type="email"
                          placeholder="E-mail Address"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-6">
                        <input
                          name="phone"
                          className="contact__input contact__input-3 contact__input-4"
                          type="text"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="col-xl-6">
                        <input
                          name="subject"
                          className="contact__input contact__input-3 contact__input-4"
                          type="text"
                          placeholder="Subject"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <textarea
                          name="message"
                          className="contact__input contact__input-3 contact__input-4 txt-area "
                          cols={30}
                          rows={10}
                          placeholder="Write Message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-12">
                        <button className="bt-btn s-btn__square" type="submit">
                          submit message
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="ajax-response" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact area end */}
        {/* contact info area start */}
        <section className="contact__info p-relative">
          <div className="container">
            <div className="contact__info-inner theme-bg">
              <div className="row">
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="contact__info-item text-center text-sm-left d-sm-flex justify-content-lg-center mb-30">
                    <div className="contact__icon mr-20">
                      <i className="fal fa-house" />
                    </div>
                    <div className="contact__info-content">
                      <h3>Our Address</h3>
                      <span>24 Broadcast Drive Charlotte</span>
                      <span> NC 28202, USA</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="contact__info-item text-center text-sm-left d-sm-flex justify-content-lg-center mb-30">
                    <div className="contact__icon mr-20">
                      <i className="fal fa-phone-alt" />
                    </div>
                    <div className="contact__info-content">
                      <h3>Phone Number</h3>
                      <span>(+06) 325 - 635 - 3265 </span>
                      <span>(+02) 653 - 352 - 6524</span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6">
                  <div className="contact__info-item text-center text-sm-left d-sm-flex justify-content-lg-center mb-30">
                    <div className="contact__icon mr-20">
                      <i className="fal fa-envelope" />
                    </div>
                    <div className="contact__info-content">
                      <h3>Email Support</h3>
                      <span>patient@basicme.com</span>
                      <span>info@basicme.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact info area end */}
        {/* contact map area start */}
        <section className="contact__map-area mt--120">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-xl-12">
                <div className="contact__map">
                  <iframe src="https://maps.google.com/maps?hl=en&q=Dhaka+()&ie=UTF8&t=&z=10&iwloc=B&output=embed" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Contact;
