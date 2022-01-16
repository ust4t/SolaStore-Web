import React from "react";
import axios from "axios";

import Shop from "../src/layout/Shop";

export default function filter({ filter, filterBrand }) {
  return <Shop allProducts={filter} full filterDropdown brands={filterBrand} />;
}

export async function getServerSideProps({ query, locale }) {
  const { categoryIds, brandIds, searchPrice } = query;

  const price = searchPrice && searchPrice.split("-");

  //   const { data: filterCatData } =
  //     await axios.get(`https://api.solastore.com.tr/api/Helpers/AdvancedSearchProductList?CatIDList=${categoryIds}&BrandIDList=${brandIds}&MinPrice=${
  //       price ? price[0] : 0
  //     }&maxPrice=${price ? price[1] : 0}&lang=${locale}&sourceProof=${
  //       process.env.SOURCE_PROOF
  //     }
  //     `);

  const [{ data: filterCatData }, { data: filterBrandData }] = await axios.all([
    axios.get(`https://api.solastore.com.tr/api/Helpers/AdvancedSearchProductList?CatIDList=${categoryIds}&BrandIDList=${brandIds}&MinPrice=${
      price ? price[0] : 0
    }&maxPrice=${price ? price[1] : 0}&lang=${locale}&sourceProof=${
      process.env.SOURCE_PROOF
    }
    `),
    axios.get(
      `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
    ),
  ]);

  return {
    props: {
      filter: filterCatData.reverse().slice(0, 120),
      filterBrand: filterBrandData,
    },
  };
}
