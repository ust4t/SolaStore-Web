import axios from "axios";
import Shop from "../../src/layout/Shop";

const ShopIndex = ({ allProducts }) => {
  return <Shop allProducts={allProducts} />;
};

export default ShopIndex;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetAllByCategoryID?id=${id}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      allProducts: data.slice(0, 15),
    },
  };
}
