import React from "react";
import axios from "axios";

import Shop from "../../src/layout/Shop";

export default function ShopPage({ catData, brandData, title }) {
  return (
    <Shop
      allProducts={catData}
      title={title}
      full
      filterDropdown
      brands={brandData}
    />
  );
}

export async function getServerSideProps({ query, locale }) {
  const { catId } = query;
  const title = catId.slice(0, catId.indexOf(":")).replace("-", " ");
  const id = catId.slice(catId.indexOf(":") + 1);

  console.log(catId);

  const [{ data: catData }, { data: brandData }] = await Promise.all([
    axios.get(
      `https://api.solastore.com.tr/api/Product/GetAllByCategoryID?id=${id}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
    ),
    axios.get(
      `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
    ),
  ]);

  return {
    props: {
      catData: catData.reverse(),
      brandData: brandData,
      title,
    },
  };
}