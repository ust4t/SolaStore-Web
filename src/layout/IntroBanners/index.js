import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import Loader from "../../components/Loader";
import BannerCard from "../../components/Cards/BannerCard";
import { useSelector } from "react-redux";

function IntroBanners({ banners }) {
  return (
    <>
      {banners && (
        <div className="banner-area pt-90">
          <div className="container">
            <div className="row custom-row align-items-center">
              <BannerCard
                banner={banners[1].guidName}
                upperTitle={banners[1].selectedText1}
                lowerTitle={banners[1].selectedText2}
                buttonText={banners[1].selectedTextButton}
                width={200}
                height={120}
                link="/shop/saleproducts"
              />
              <BannerCard
                banner={banners[0].guidName}
                upperTitle={banners[0].selectedText1}
                lowerTitle={banners[0].selectedText2}
                buttonText={banners[0].selectedTextButton}
                width={300}
                height={350}
                link="/shop/newproducts"
              />
              <BannerCard
                banner={banners[2].guidName}
                upperTitle={banners[2].selectedText1}
                lowerTitle={banners[2].selectedText2}
                buttonText={banners[2].selectedTextButton}
                width={200}
                height={120}
                link="/shop/bestseller"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default IntroBanners;
