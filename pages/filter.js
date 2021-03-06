import React from "react";
import axios from "axios";

import Shop from "../src/layout/Shop";
import useTranslation from "next-translate/useTranslation";

export default function Filter({ filter, filterBrand }) {
  const { t } = useTranslation("home");

  return (
    <Shop
      isHidden={true}
      allProducts={filter}
      full
      titleHead={`Sola Store | ${t("filterTitle")}`}
      title="Filter"
      filterDropdown
      brands={filterBrand}
    />
  );
}

export async function getServerSideProps({ query, locale }) {
  const { categoryIds, brandIds, searchPrice } = query;
  const price = searchPrice ? searchPrice.split("-") : [0, 0];

  const [{ data: filterCatData }, { data: filterBrandData }] =
    await Promise.all([
      axios.get(
        `https://api.solastore.com.tr/api/Helpers/AdvancedSearchProductList?CatIDList=${
          categoryIds || ""
        }&BrandIDList=${brandIds || ""}&MinPrice=${price[0]}&maxPrice=${
          price[1]
        }&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      axios.get(
        `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
      ),
    ]);

  return {
    props: {
      filter: filterCatData.reverse(),
      filterBrand: filterBrandData,
    },
  };
}
