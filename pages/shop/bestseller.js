import useTranslation from "next-translate/useTranslation";
import React from "react";

import Shop from "../../src/layout/Shop";

export default function BestSeller({ bestSeller }) {
  const { t } = useTranslation("home");
  return (
    <Shop
      allProducts={bestSeller}
      full
      title={t("bestseller")}
      titleHead={`Sola Store | ${t("bestseller")}`}
    />
  );
}

export async function getStaticProps({ locale }) {
  const respond = await fetch(
    `https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );
  const popularData = await respond.json();
  // const allProducts = [];

  // await Promise.all(
  //   popularData.reverse().map(async (popular) => {
  //     const product = await fetch(
  //       `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${popular.masterProductID}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  //     );
  //     const specificData = await product.json();
  //     allProducts.push({
  //       ...popular,
  //       variants: specificData,
  //     });
  //   })
  // );
  return {
    props: {
      bestSeller: popularData.filter((product) => product.picture_1 !== null),
      revalidate: 180,
    },
  };
}
