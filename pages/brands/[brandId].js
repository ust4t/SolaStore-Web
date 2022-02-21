import React from "react";
import axios from "axios";

import Shop from "../../src/layout/Shop";
import sources from "../../sources";

export default function BrandsPage({ brandItems, brandData, title, id }) {
  return (
    <Shop
      allProducts={brandItems}
      titleHead={`Sola Store | ${title.toUpperCase()}`}
      title={title.toUpperCase()}
      share={true}
      shareDetails={{
        data: {
          url: `https://www.solastore.com.tr/brands/`,
          name: title,
          id,
          picture: `${sources.brand}${
            brandData.filter((item) => item.brandID === Number(id))[0].guidName2
          }`,
        },
        title: t("shareBrand"),
      }}
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
      brandData,
      title,
      id,
    },
  };
}
