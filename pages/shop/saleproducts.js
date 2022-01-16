import axios from "axios";
import Shop from "../../src/layout/Shop";

const SaleProductPage = ({ saleProducts }) => {
  return <Shop allProducts={saleProducts} full />;
};

export default SaleProductPage;

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      saleProducts: data.reverse(),
    },
  };
}
