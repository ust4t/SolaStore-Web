import React from "react";
import axios from "axios";

import Shop from "../../src/layout/Shop";

export default function BrandsPage({ brandItems, brandData, title }) {
  return (
    <Shop
      allProducts={brandItems}
      titleHead={title}
      title={title}
      full
      filterDropdown
      brands={brandData}
    />
  );
}

export async function getServerSideProps({ query, locale }) {
  const { brandId } = query;
  const title = brandId.slice(0, brandId.indexOf(":")).replace("-", " ");
  const id = brandId.slice(brandId.indexOf(":") + 1);
  console.log(id);
  const [{ data: brandItems }, { data: brandData }] = await Promise.all([
    axios.get(
      `https://api.solastore.com.tr/api/Product/GetSelectedBrandProducts?BrandID=${id}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
    ),
    axios.get(
      `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
    ),
  ]);

  return {
    props: {
      brandItems: brandItems.reverse(),
      brandData: brandData,
      title,
    },
  };
}
