import axios from "axios";
import Shop from "../../src/layout/Shop";

const ShopIndex = ({ allProducts }) => {
  return <Shop allProducts={allProducts} full />;
};

export default ShopIndex;

export async function getServerSideProps({ query, locale }) {
  const { catId } = query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetAllByCategoryID?id=${catId}&lang=${locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      allProducts: data.reverse().slice(0, 120),
    },
  };
}
