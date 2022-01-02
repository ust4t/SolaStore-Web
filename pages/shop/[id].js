import axios from "axios";
import { useRouter } from "next/router";
import Details from "../../src/components/product/Details";

const Single = ({ product }) => {
  const router = useRouter();

  console.log(router);

  return <Details product={product} />;
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
