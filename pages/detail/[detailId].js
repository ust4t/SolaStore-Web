import axios from "axios";
import Router from "next/router";
import Details from "../../src/components/product/Details";

const DetailPage = ({
  productMain,
  brand,
  category,
  productVariants,
  selectedProduct,
}) => {
  return (
    <Details
      productMain={productMain}
      incomingProduct={selectedProduct}
      productVariants={productVariants}
      brand={brand[0]}
      category={category}
    />
  );
};

export default DetailPage;

export async function getServerSideProps(context) {
  const { detailId, selected } = context.query;

  const id = detailId.slice(detailId.indexOf(":") + 1);

  const { data: brands } = await axios.get(
    `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
  );
  const { data: category } = await axios.get(
    `https://api.solastore.com.tr/api/Category/GetByProductID?productID=${id}&lang=${context.locale}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  const [{ data: productData }, { data: productVariantsData }] =
    await Promise.all([
      axios.get(
        `https://api.solastore.com.tr/api/Product/GetByProductID?id=${id}&lang=${context.locale}&sourceProof=${process.env.SOURCE_PROOF}`
      ),
      axios.get(
        `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${id}&lang=${context.locale}&sourceProof=ugurturkmenn%40gmail.com`
      ),
    ]);

  // const [productData, productVariantsData] = await Promise.all([
  //   productRes.json(),
  //   productVariantsRes.json(),
  // ]);
  const allProducts = [...productData, ...productVariantsData];
  return {
    props: {
      selectedProduct: selected
        ? allProducts.filter(
            (product) => product.productID === Number(selected)
          )[0]
        : allProducts.filter((product) => product.productID === Number(id))[0],
      productMain: productData[0],
      productVariants: productVariantsData,
      brand: brands.filter(
        (brandItem) => brandItem.brandID === productData[0].brandID
      ),
      category,
    },
  };
}
