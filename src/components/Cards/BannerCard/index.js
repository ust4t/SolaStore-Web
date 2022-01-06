import React from "react";
import Link from "next/link";

import sources from "../../../../sources";

export default function BannerCard({
  banner,
  upperTitle,
  lowerTitle,
  buttonText,
}) {
  return (
    <div className="col-md-4 custom-col">
      <div className="single-banner text-center mb-30">
        <Link href="/">
          <a className="position-relative">
            <img
              src={`${sources.banners}${banner}`}
              className="img-fluid"
              alt="Banner"
            />
            <div className="container position-absolute top-50 start-0 translate-middle-y">
              <div className="row ">
                <div className="col-md-12">
                  <div className="banner-content d-flex flex-column align-items-center">
                    <h5 className="text-white text-center text-shadow">
                      {upperTitle}
                    </h5>
                    <h3 className="text-white text-center text-shadow">
                      {lowerTitle}
                    </h3>
                    <a href="#" className="underline-link text-shadow">
                      {buttonText}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
