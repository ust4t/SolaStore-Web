import React from "react";
import axios from "axios";
import useTranslation from "next-translate/useTranslation";

import Shop from "../../src/layout/Shop";

export default function ShopPage({ catData, brandData, title, id }) {
  const { t } = useTranslation("common");
  return (
    <Shop
      allProducts={catData}
      titleHead={`Sola Store | ${title.toUpperCase()}`}
      title={title.toUpperCase()}
      share={true}
      shareDetails={{
        data: {
          url: `https://www.solastore.com.tr/shop/`,
          name: title,
          id,
        },
        title: t("shareCat"),
      }}
      full
      filterDropdown
      brands={brandData}
    />
  );
}

export async function getServerSideProps({ query, locale, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=15, stale-while-revalidate=59"
  );
  const { catId } = query;
  const title = catId.slice(0, catId.indexOf(":")).replace("-", " ");
  const id = catId.slice(catId.indexOf(":") + 1);

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
      catData: catData
        .reverse()
        .filter((product) => product.picture_1 !== null),
      brandData: brandData,
      title,
      id,
    },
  };
}
