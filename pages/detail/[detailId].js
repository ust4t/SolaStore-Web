import Details from '../../src/components/product/Details';

const Single = ({ product, brand, productVariants }) => {
	return (
		<Details
			incomingProduct={product}
			productVariants={productVariants}
			brand={brand[0]}
		/>
	);
};

export default Single;

export async function getServerSideProps(context) {
	const { detailId } = context.query;

	const brands = await fetch(
		`https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
	);
	const brandsJson = await brands.json();

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
			brand: brandsJson.filter(
				(brandItem) => brandItem.brandID === productData[0].brandID
			),
		},
	};
}
