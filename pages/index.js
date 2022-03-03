import { memo, useState, useEffect } from "react";
import dynamic from "next/dynamic";

import IntroBanners from "../src/layout/IntroBanners";
import FilterSearch from "../src/layout/FilterSearch";
import Layout from "../src/layout/Layout";
import SliderProducts from "../src/components/sliders/sliderProducts";
import TabLayout from "../src/layout/TabLayout";
const VideoCallBanner = dynamic(() => import("../src/layout/VideoCallBanner"));
const EnterNumberLayout = dynamic(() =>
  import("../src/layout/EnterNumberLayout")
);
const VisitStore = dynamic(() => import("../src/components/VisitStore"));
const BrandsLayout = dynamic(() => import("../src/layout/BrandsLayout"));
const Categories = dynamic(() => import("../src/layout/Categories"));
const ZuckStories = dynamic(
  () => import("../src/components/Cards/ZuckStories"),
  {
    ssr: false,
  }
);

const Index4 = ({
  newProducts,
  saleProducts,
  categoriesData,
  slidersData,
  bannersData,
  brands,
}) => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const abortController = new AbortController();
      const locationRes = await fetch("/api/getLocation", {
        signal: abortController.signal,
      });
      const locationData = await locationRes.json();
      setLocation(locationData);
      return () => {
        abortController.abort();
      };
    })();
  }, []);

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <ZuckStories storiesData={newProducts.slice(0, 5)} />
        <SliderProducts sliders={slidersData} />
        {location && location.country_code.toLowerCase() === "tr" && (
          <VisitStore />
        )}
        <VideoCallBanner />
        <div className="mx-md-2 mx-lg-3 mx-xl-4">
          <IntroBanners banners={bannersData} />
          <FilterSearch brands={brands} />
          <TabLayout newProducts={newProducts} saleProducts={saleProducts} />
          <Categories categories={categoriesData} />
        </div>

        <div className="mx-md-2 mx-lg-3 mx-xl-4">
          <EnterNumberLayout />
          <BrandsLayout brands={brands} />
        </div>
      </main>
    </Layout>
  );
};
export default memo(Index4);

export async function getStaticProps({ locale }) {
  const [
    newProductsRes,
    saleProductsRes,
    sliderRes,
    bannerRes,
    categoriesRes,
    brandsRes,
  ] = await Promise.all([
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
    fetch(
      `https://api.solastore.com.tr/api/Advertising/CampaignPictruresByLang?sourceProof=${
        process.env.SOURCE_PROOF
      }&lang=${chooseLang(locale)}`
    ),
    fetch(
      `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
    ),
  ]);

  const [
    newProducts,
    saleProducts,
    slidersData,
    bannersData,
    categoriesData,
    brands,
  ] = await Promise.all([
    newProductsRes.json(),
    saleProductsRes.json(),
    sliderRes.json(),
    bannerRes.json(),
    categoriesRes.json(),
    brandsRes.json(),
  ]);

  return {
    props: {
      newProducts: newProducts.filter((product) => product.picture_1 !== null),
      saleProducts: saleProducts.reverse(),
      slidersData,
      bannersData,
      categoriesData,
      brands,
    },
    revalidate: 300,
  };
}

const chooseLang = (lang) => {
  switch (lang) {
    case "tr":
      return 1;
    case "en":
      return 2;
    case "fr":
      return 3;
    case "ar":
      return 4;
    default:
      return 5;
  }
};
