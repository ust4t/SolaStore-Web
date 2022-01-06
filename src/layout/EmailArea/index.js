import React from "react";

export default function EmailArea() {
  return (
    <section className="newsletter-area pt-20 mb-60">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div
              className="news-wrapper news-wrapper-2 news-wrapper-3 text-center pt-30 pb-30"
              data-background="img/newsletter-bg.jpg"
              style={{
                backgroundImage: 'url("/img/newsletter-bg.jpg")',
              }}>
              <h4 className="text-white">40% Flate On Subscription</h4>
              <p className="text-white">
                Lorem Ipsum is simply dummy texting of the printing and
                typesettingig amet industry
              </p>
              <div className="news-form-wrapper news-form-wrapper-2 news-form-wrapper-3 mt-40 mb-10">
                <form onSubmit={(e) => e.preventDefault()}>
                  <input type="email" placeholder="Email Address" />
                  <button className="bg-color-main-outline" type="submit">
                    Subscribe
                  </button>
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
  );
}
