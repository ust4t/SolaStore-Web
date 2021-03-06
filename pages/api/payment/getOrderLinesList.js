import axios from "axios";

export default async function getOrderLinesList(req, res) {
  const { orderID } = req.query;
  try {
    const response = await axios.get(
      `https://api.solastore.com.tr/api/Order/OrderLinesList?OrderID=${orderID}&sourceProof=${process.env.SOURCE_PROOF}`
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
