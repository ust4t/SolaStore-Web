import React from "react";

import BannerCard from "../../components/Cards/BannerCard";

function IntroBanners({ banners }) {
  return (
    <div
      className="banner-area"
      style={{
        paddingTop: "40px",
      }}>
      <div className="container">
        <div className="row custom-row align-items-center">
          <BannerCard
            banner={banners[1].guidName}
            upperTitle={banners[1].selectedText1}
            lowerTitle={banners[1].selectedText2}
            buttonText={banners[1].selectedTextButton}
            width={200}
            height={165}
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
            height={165}
            link="/shop/bestseller"
          />
        </div>
      </div>
    </div>
  );
}
export default IntroBanners;
