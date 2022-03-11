import axios from "axios";
import useTranslation from "next-translate/useTranslation";

import Shop from "../../src/layout/Shop";

const SaleProductPage = ({ saleProducts }) => {
  const { t } = useTranslation("home");

  return (
    <Shop
      allProducts={saleProducts}
      full
      title={t("sale")}
      titleHead={`Sola Store | ${t("sale")}`}
    />
  );
};

export default SaleProductPage;

export async function getServerSideProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      saleProducts: data.reverse(),
      revalidate: 180,
    },
  };
}
