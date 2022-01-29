import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Shop from '../../src/layout/Shop';
import { SET_TITLE } from '../../src/redux/action/type';

export default function BestSeller({ bestSeller }) {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: SET_TITLE,
			payload: 'Best Seller',
		});
	}, []);
	return <Shop allProducts={bestSeller} full />;
}

export async function getStaticProps({ locale }) {
	const respond = await fetch(
		`https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
	);
	const popularData = await respond.json();
	// const allProducts = [];

	// await Promise.all(
	//   popularData.reverse().map(async (popular) => {
	//     const product = await fetch(
	//       `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${popular.masterProductID}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
	//     );
	//     const specificData = await product.json();
	//     allProducts.push({
	//       ...popular,
	//       variants: specificData,
	//     });
	//   })
	// );
	return {
		props: {
			bestSeller: popularData,
		},
	};
}
