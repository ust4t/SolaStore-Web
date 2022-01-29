import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Shop from '../src/layout/Shop';
import { SET_TITLE } from '../src/redux/action/type';

const search = ({ search }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: SET_TITLE,
			payload: 'Search',
		});
	}, []);
	return <Shop allProducts={search} full />;
};

export default search;

export async function getServerSideProps({ query, locale }) {
	const { searchText } = query;
	const { data: searchData } = await axios.get(
		`https://api.solastore.com.tr/api/Helpers/AdvancedSearchTextSearch?text=${searchText}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
	);
	return {
		props: {
			search: searchData.reverse().slice(0, 120),
		},
	};
}
