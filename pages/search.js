import axios from "axios";

import Shop from "../src/layout/Shop";

const Search = ({ search, searchText }) => {
  return (
    <Shop
      titleHead="Sola Store | Оптом Женская одежда | Wholesale Women's Clothing"
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
