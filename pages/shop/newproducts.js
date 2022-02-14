import axios from "axios";
import useTranslation from "next-translate/useTranslation";

import Shop from "../../src/layout/Shop";

const NewProductPage = ({ newProducts }) => {
  const { t } = useTranslation("home");
  return (
    <Shop
      allProducts={newProducts}
      full
      title={t("new")}
      titleHead="Sola Store | Оптом Женская одежда | Wholesale Women's Clothing"
    />
  );
};

export default NewProductPage;

export async function getServerSideProps({ locale }) {
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
      newProducts: data.filter((product) => product.picture_1 !== null),
      revalidate: 15,
    },
  };
}
