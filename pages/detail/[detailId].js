import Router from "next/router";
import Details from "../../src/components/product/Details";

const DetailPage = ({ product, brand, productVariants, selectedProduct }) => {
  return (
    <Details
      incomingProduct={selectedProduct}
      productVariants={productVariants}
      brand={brand[0]}
    />
  );
};

export default DetailPage;

export async function getServerSideProps(context) {
  const { detailId, selected } = context.query;

  const id = detailId.slice(detailId.indexOf(":") + 1);

  const brands = await fetch(
    `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
  );
  const brandsJson = await brands.json();

  const [productRes, productVariantsRes] = await Promise.all([
    fetch(
      `https://api.solastore.com.tr/api/Product/GetByProductID?id=${id}&lang=${context.locale}&sourceProof=${process.env.SOURCE_PROOF}`
    ),
    fetch(
      `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${id}&lang=${context.locale}&sourceProof=ugurturkmenn%40gmail.com`
    ),
  ]);

  const [productData, productVariantsData] = await Promise.all([
    productRes.json(),
    productVariantsRes.json(),
  ]);
  const allProducts = [...productData, ...productVariantsData];
  return {
    props: {
      selectedProduct: selected
        ? allProducts.filter(
            (product) => product.productID === Number(selected)
          )[0]
        : allProducts.filter((product) => product.productID === Number(id))[0],
      product: productData[0],
      productVariants: productVariantsData,
      brand: brandsJson.filter(
        (brandItem) => brandItem.brandID === productData[0].brandID
      ),
    },
  };
}
