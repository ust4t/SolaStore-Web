export default async function menuFetch(req, res) {
  const { orderId } = req.query;
  try {
    const response = await axios.get(
      `https://api.solastore.com.tr/api/Order/OrderLinesList?OrderID=${orderId}&sourceProof=${process.env.SOURCE_PROOF}`
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
