import { useEffect } from "react";
import { connect } from "react-redux";
import { getHome4 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import { animationCreate, splitText } from "../src/utils/utils";
import VideoLayout from "../src/layout/VideoLayout";
import IntroBanners from "../src/layout/IntroBanners";
import Categories from "../src/layout/Categories";
import { Box } from "@mui/material";
import BrandsLayout from "../src/layout/BrandsLayout";
import FilterSearch from "../src/layout/FilterSearch";
import CountdownSection from "../src/layout/CountdownSection";
import EmailArea from "../src/layout/EmailArea";
import Layout from "../src/layout/Layout";
import Stories from "../src/layout/Stories";
import SliderProducts from "../src/components/sliders/sliderProducts";
import TabLayout from "../src/layout/TabLayout";
import axios from "axios";

const Index4 = ({ newProducts, saleProducts }) => {
  useEffect(() => {
    animationCreate();
  }, []);

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
        <SliderProducts />
        <Box
          mx={{
            xs: 0,
            sm: 0,
            md: 10,
            lg: 12,
            xl: 14,
          }}>
          <IntroBanners />
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

export default Index4;

export async function getServerSideProps() {
  const { data: newProducts } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetNewProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
  );
  const { data: saleProducts } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      newProducts: newProducts.reverse(),
      saleProducts: saleProducts.reverse(),
    },
  };
}
