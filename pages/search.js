import axios from "axios";

import Shop from "../src/layout/Shop";

const Search = ({ search, searchText }) => {
  console.log(search);
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

  let allSearchData = [];

  await Promise.all(
    searchData.map(async (product) => {
      const { data: productData } = await axios.get(
        `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${product.masterProductID}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      );
      productData.map((variant) =>
        allSearchData.push({
          ...variant,
          video_1: product.video_1,
        })
      );
    })
  );

  return {
    props: {
      search: [...searchData.reverse(), ...allSearchData],
      searchText,
    },
  };
}
