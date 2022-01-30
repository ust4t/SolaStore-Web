import { memo } from 'react';
import dynamic from 'next/dynamic';
// import VideoLayout from "../src/layout/VideoLayout";
import IntroBanners from '../src/layout/IntroBanners';
// import Categories from "../src/layout/Categories";
// import BrandsLayout from "../src/layout/BrandsLayout";
import FilterSearch from '../src/layout/FilterSearch';
// import CountdownSection from "../src/layout/CountdownSection";
// import EmailArea from "../src/layout/EmailArea";
import Layout from '../src/layout/Layout';
import SliderProducts from '../src/components/sliders/sliderProducts';
import TabLayout from '../src/layout/TabLayout';
const Stories = dynamic(() => import('../src/layout/Stories'));
const BrandsLayout = dynamic(() => import('../src/layout/BrandsLayout'));
const Categories = dynamic(() => import('../src/layout/Categories'));

const Index4 = ({
	newProducts,
	saleProducts,
	categoriesData,
	slidersData,
	bannersData,
	brands,
}) => {
	// const countdownSource = {
	//   img: "/img/countdown-bg.jpg",
	//   value: "-28",
	//   status: "Hot",
	//   title: "Covid-19 Prevention & Product Supplies",
	//   text: "Ut ultricies imperdiet sodales. Aliquam fringilla aliquam exs it amet elementum. Proin bibendum feugiat simplifies.",
	//   date: "2022-11-27 00:00:00",
	// };
	return (
		<Layout news={4} logoLeft layout={2} paymentOption>
			<main>
				<Stories stories={newProducts} />
				<SliderProducts sliders={slidersData} />
				<div className='mx-md-2 mx-lg-3 mx-xl-4'>
					<IntroBanners banners={bannersData} />
					<FilterSearch brands={brands} />
					<TabLayout newProducts={newProducts} saleProducts={saleProducts} />
					<Categories categories={categoriesData} />
					{/* <CountdownSection countdown={countdownSource} /> */}
					{/* <EmailArea /> */}
				</div>
				{/* <VideoLayout /> */}

				<div className='mx-md-2 mx-lg-3 mx-xl-4'>
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
			newProducts: newProducts.reverse(),
			saleProducts: saleProducts.reverse(),
			slidersData,
			bannersData,
			categoriesData,
			brands,
		},
	};
}

const chooseLang = (lang) => {
	switch (lang) {
		case 'tr':
			return 1;
		case 'en':
			return 2;
		case 'fr':
			return 3;
		case 'ar':
			return 4;
		default:
			return 5;
	}
};
