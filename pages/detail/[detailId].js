import Details from "../../src/components/product/Details";

const Single = ({ product, productVariants }) => {
  return (
    <Details incomingProduct={product} productVariants={productVariants} />
  );
};

export default Single;

export async function getServerSideProps(context) {
  const { detailId } = context.query;

  const [productRes, productVariantsRes] = await Promise.all([
    fetch(
      `https://api.solastore.com.tr/api/Product/GetByProductID?id=${detailId}&lang=${context.locale}&sourceProof=${process.env.SOURCE_PROOF}`
    ),
    fetch(
      `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${detailId}&lang=${context.locale}&sourceProof=ugurturkmenn%40gmail.com`
    ),
  ]);

  const [productData, productVariantsData] = await Promise.all([
    productRes.json(),
    productVariantsRes.json(),
  ]);

  return {
    props: {
      product: productData[0],
      productVariants: productVariantsData,
    },
  };
}
