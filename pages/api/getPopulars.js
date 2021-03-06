export default async function (req, res) {
  const respond = await fetch(
    `https://api.solastore.com.tr/api/Product/GetBestSellerProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
  );
  const popularData = await respond.json();
  const allProducts = [];

  await Promise.all(
    popularData.map(async (popular) => {
      const product = await fetch(
        `https://api.solastore.com.tr/api/Product/GetVariationsByProductID?ProductID=${popular.masterProductID}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
      );
      const specificData = await product.json();
      allProducts.push({
        masterId: popular.masterProductID,
        id: popular.masterProductID,
        name: popular.productShortName,
        images: popular.pictures,
        sizes: popular.sizes,
        price: popular.price,
        singlePrice: popular.singlePrice,
        oldPrice: popular.oldPrice,
        productStockCode: popular.productStockCode,
        discount: popular.singlePrice,
        video_1: popular.video_1,
        variants: specificData,
      });
    })
  );
  await res.status(200).json(allProducts);
}
