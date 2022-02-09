import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Shop from "../src/layout/Shop";
import { SET_TITLE } from "../src/redux/action/type";

const Search = ({ search, searchText }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_TITLE,
      payload: "Search",
    });
  }, []);
  return (
    <Shop
      title={`Your Result: ' ${searchText} '`}
      isActiveHidden
      allProducts={search}
      full
    />
  );
};

export default Search;

export async function getServerSideProps({ query, locale }) {
  const { searchText } = query;
  const { data: searchData } = await axios.get(
    `https://api.solastore.com.tr/api/Helpers/AdvancedSearchTextSearch?text=${searchText}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );
  return {
    props: {
      search: searchData.reverse().slice(0, 120),
      searchText,
    },
  };
}
