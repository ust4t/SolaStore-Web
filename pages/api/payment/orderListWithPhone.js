import axios from "axios";

export default async function getOrderList(req, res) {
  const { orderTel } = req.body;

  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Order/OrderListWithPhone?sourceProof=ugurturkmenn%40gmail.com&phoneNumber=${orderTel.toString()}`
    );
    res.status(200).json(data.data);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}
