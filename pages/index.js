import { useEffect } from "react";
import { connect } from "react-redux";
import { getHome4 } from "../src/redux/action/home";
import { getProducts } from "../src/redux/action/product";
import { simpleProductFilter } from "../src/utils/filterProduct";
import time from "../src/utils/time";
import { animationCreate, splitText } from "../src/utils/utils";
import VideoLayout from "../src/layout/VideoLayout";
import IntroBanners from "../src/layout/IntroBanners";
import Filter from "../src/components/product/filter/Filter";
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

const Index4 = ({
  getHome4,
  sliders,
  banner_1,
  iconSliders,
  banner_2,
  banner_3,
  getProducts,
  products,
}) => {
  useEffect(() => {
    getHome4();
    getProducts();
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
        <Stories />
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
          <TabLayout />
          <Categories />
          <CountdownSection countdown={countdownSource} />
          <EmailArea />
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

const mapStateToProps = (state) => ({
  sliders: state.home.home4 && state.home.home4.sliders,
  banner_1: state.home.home4 && state.home.home4.banner_1,
  iconSliders: state.home.home4 && state.home.home4.iconSliders,
  banner_2: state.home.home4 && state.home.home4.banner_2,
  banner_3: state.home.home4 && state.home.home4.banner_3,
  products: simpleProductFilter("home_4", state.product.products),
});

export default connect(mapStateToProps, { getHome4, getProducts })(Index4);
