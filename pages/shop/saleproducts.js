import axios from "axios";
import useTranslation from "next-translate/useTranslation";

import Shop from "../../src/layout/Shop";
// import ProductCategory from "../../src/layout/ProductCategory";

const SaleProductPage = ({ saleProducts, page, count }) => {
  const { t } = useTranslation("home");

  return (
    // <ProductCategory
    //   allProducts={saleProducts}
    //   title={t("sale")}
    //   titleHead={`Sola Store | ${t("sale")}`}
    //   full
    //   selectedPage={page}
    //   count={count}
    //   catRoute="saleproducts"
    // />
    <Shop
      allProducts={saleProducts}
      full
      title={t("sale")}
      titleHead={`Sola Store | ${t("sale")}`}
    />
  );
};

export default SaleProductPage;

export async function getServerSideProps({ locale, query }) {
  // const { page, pageSize } = query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
    // `https://api.solastore.com.tr/api/Product/GetSaleProductsNew?lang=${locale}&pageNumber=${
    //   page || 1
    // }&pageSize=${pageSize || 20}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      // saleProducts: data.sort(
      //   (a, b) => new Date(b.lastUpdateDate) - new Date(a.lastUpdateDate)
      // ),
      saleProducts: data,
      // revalidate: 180,
      // page: page || 1,
      // count: data.count,
    },
  };
}
