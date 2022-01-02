import axios from "axios";
import Details from "../../src/components/product/Details";

const Single = ({ product }) => {
  return <Details incomingProduct={product} />;
};

export default Single;

export async function getServerSideProps(context) {
  const { id } = context.query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Product/GetByProductID?id=${id}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      product: data[0],
    },
  };
}
