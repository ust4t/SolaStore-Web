import axios from "axios";
import useTranslation from "next-translate/useTranslation";

import Shop from "../../src/layout/Shop";

const NewProductPage = ({ newProducts }) => {
  const { t } = useTranslation("home");
  return <Shop allProducts={newProducts} full title={t("new")} />;
};

export default NewProductPage;

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetNewProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  // const allNewProducts = [];

  // await Promise.all(
  //   data
  //     .reverse()
  //     .slice(0, 30)
  //     .map(async (newProduct) => {
  //       const { data: specificData } = await axios.get(
  //         `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${newProduct.masterProductID}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  //       );

  //       allNewProducts.push({
  //         ...newProduct,
  //         variants: specificData,
  //       });
  //     })
  // );

  return {
    props: {
      newProducts: data,
      revalidate: 15,
    },
  };
}
