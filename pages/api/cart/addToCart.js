export default async function menuFetch(req, res) {
  const { user, ProductID } = req.query;
  try {
    const response = await axios.post(
      `https://api.solastore.com.tr/api/Order/AddToChart?UserID=${user}&ProductID=${ProductID}&Quantity=1&sourceProof=${process.env.SOURCE_PROOF}`
    );
    res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
