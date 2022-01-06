import React from "react";

import Link from "next/link";
import time from "../../utils/time";

export default function CountdownSection({ countdown }) {
  return (
    <section
      className="countdown-area pt-60 pb-60 mb-40"
      data-background={countdown && countdown.img}>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 offset-xl-8 col-lg-5 offset-lg-7 col-md-8 offset-md-4 custom-width-40">
            <div className="countdown-wrapper hero-caption-four">
              <div className="sli-offer mb-15">
                <span>{countdown && countdown.value}%</span>
                <span>{countdown && countdown.status}</span>
              </div>
              <h2>{countdown && countdown.title}</h2>
              <p>{countdown && countdown.text}</p>
              <div className="product-countdown mb-40">
                <div className="time-count-deal">
                  <div className="countdown-list">
                    <div className="time-count">
                      {time(countdown && countdown.date).days} <span>days</span>
                    </div>
                    <div className="time-count">
                      {time(countdown && countdown.date).hours}{" "}
                      <span>hour</span>
                    </div>
                    <div className="time-count">
                      {time(countdown && countdown.date).minutes}{" "}
                      <span>minute</span>
                    </div>
                    <div className="time-count">
                      {time(countdown && countdown.date).seconds}{" "}
                      <span>Second</span>
                    </div>
                  </div>
                </div>
              </div>
              <Link href="/">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="common-link">
                  Deal of the day
                  <i className="fas fa-chevron-circle-right" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
