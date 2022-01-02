export default async function getProduct(req, res) {
  const { id } = req.query;

  try {
    const response = await fetch(
      `https://api.solastore.com.tr/api/Product/GetByProductID?id=${id}&lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
    );
    const data = await response.json();
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
