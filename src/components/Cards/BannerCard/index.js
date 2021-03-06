import React from "react";
import Link from "next/link";
import Image from "next/image";

import { single_banner, bannerTitle } from "./BannerCard.module.css";
import sources from "../../../../sources";

export default function BannerCard({
  banner,
  upperTitle,
  lowerTitle,
  buttonText,
  width,
  height,
  link,
}) {
  return (
    <div className="col-md-4 custom-col">
      <div className={`${single_banner} text-center mb-30`}>
        <Link href={link}>
          <a className="position-relative">
            <Image
              src={`${sources.banners}${banner}`}
              alt="Banner"
              width={width}
              height={height}
              layout="responsive"
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
            <div className="container position-absolute top-50 start-0 translate-middle-y">
              <div className="row">
                <div className="col-md-12">
                  <div className="banner-content d-flex flex-column align-items-center">
                    <h5
                      className={`text-white text-center text-shadow ${bannerTitle}`}>
                      {upperTitle}
                    </h5>
                    <h3
                      className={`text-white text-center text-shadow ${bannerTitle}`}>
                      {lowerTitle}
                    </h3>
                    <a className={`underline-link text-shadow ${bannerTitle}`}>
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
