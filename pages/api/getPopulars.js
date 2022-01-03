export default async function (req, res) {
  const respond = await fetch(
    "https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=tr&sourceProof=ugurturkmenn%40gmail.com"
  );
  const popularData = await respond.json();
  const allProducts = [];
  for (const popular of popularData) {
    const specificPopular = await fetch(
      `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${popular.masterProductID}&lang=tr&sourceProof=ugurturkmenn%40gmail.com`
    );
    const specificData = await specificPopular.json();
    allProducts.push({
      id: popular.productID,
      name: popular.productShortName,
      images: popular.pictures,
      price: popular.price,
      oldPrice: popular.oldPrice,
      discount: popular.singlePrice,
      variants: specificData,
    });
  }
  await res.status(201).send(allProducts);
}
