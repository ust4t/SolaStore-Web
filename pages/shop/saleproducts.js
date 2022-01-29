import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Shop from '../../src/layout/Shop';
import { SET_TITLE } from '../../src/redux/action/type';

const SaleProductPage = ({ saleProducts }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: SET_TITLE,
			payload: 'Sale Products',
		});
	}, []);
	return <Shop allProducts={saleProducts} full />;
};

export default SaleProductPage;

export async function getStaticProps({ locale }) {
	const { data } = await axios.get(
		`https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
	);

	return {
		props: {
			saleProducts: data.reverse(),
		},
	};
}
