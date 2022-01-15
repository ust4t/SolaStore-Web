import { memo } from "react";
import dynamic from "next/dynamic";
import VideoLayout from "../src/layout/VideoLayout";
import IntroBanners from "../src/layout/IntroBanners";
// import Categories from "../src/layout/Categories";
import { Box } from "@mui/material";
// import BrandsLayout from "../src/layout/BrandsLayout";
import FilterSearch from "../src/layout/FilterSearch";
// import CountdownSection from "../src/layout/CountdownSection";
// import EmailArea from "../src/layout/EmailArea";
import Layout from "../src/layout/Layout";
// import Stories from "../src/layout/Stories";
import SliderProducts from "../src/components/sliders/sliderProducts";
import TabLayout from "../src/layout/TabLayout";
import { connect } from "react-redux";
const Stories = dynamic(() => import("../src/layout/Stories"));
const BrandsLayout = dynamic(() => import("../src/layout/BrandsLayout"));
const Categories = dynamic(() => import("../src/layout/Categories"));

const Index4 = ({
  newProducts,
  saleProducts,
  lang,
  slidersData,
  bannersData,
}) => {
  const countdownSource = {
    img: "/img/countdown-bg.jpg",
    value: "-28",
    status: "Hot",
    title: "Covid-19 Prevention & Product Supplies",
    text: "Ut ultricies imperdiet sodales. Aliquam fringilla aliquam exs it amet elementum. Proin bibendum feugiat simplifies.",
    date: "2022-11-27 00:00:00",
  };

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <Stories stories={newProducts} />
        <SliderProducts sliders={slidersData} />
        <Box
          mx={{
            xs: 0,
            sm: 0,
            md: 10,
            lg: 12,
            xl: 14,
          }}>
          <IntroBanners banners={bannersData} />
          <FilterSearch />
          <TabLayout newProducts={newProducts} saleProducts={saleProducts} />
          <Categories />
          {/* <CountdownSection countdown={countdownSource} /> */}
          {/* <EmailArea /> */}
        </Box>
        <VideoLayout />

        <Box
          mx={{
            xs: 0,
            sm: 0,
            md: 10,
            lg: 12,
            xl: 14,
          }}>
          <BrandsLayout />
        </Box>
      </main>
    </Layout>
  );
};
export default memo(Index4);

export async function getStaticProps({ locale }) {
  const [newProductsRes, saleProductsRes, sliderRes, bannerRes] =
    await Promise.all([
      fetch(
        `https://api.solastore.com.tr/api/Product/GetNewProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      fetch(
        `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      fetch(
        `https://api.solastore.com.tr/api/Advertising/Slider?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      fetch(
        `https://api.solastore.com.tr/api/Advertising/MainAdd?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
    ]);

  const [newProducts, saleProducts, slidersData, bannersData] =
    await Promise.all([
      newProductsRes.json(),
      saleProductsRes.json(),
      sliderRes.json(),
      bannerRes.json(),
    ]);

  return {
    props: {
      newProducts: newProducts.reverse(),
      saleProducts: saleProducts.reverse(),
      slidersData,
      bannersData,
    },
  };
}
