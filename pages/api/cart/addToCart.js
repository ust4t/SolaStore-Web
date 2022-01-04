import axios from "axios";

export default async function addToCart(req, res) {
  const { user, productID } = req.query;
  try {
    const { data } = await axios.post(
      `https://api.solastore.com.tr/api/Order/AddToChart?UserID=${user}&ProductID=${productID}&Quantity=1&sourceProof=${process.env.SOURCE_PROOF}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          productID,
          quantity: 1,
          originId: productID,
        },
      }
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error,
      },
    });
  }
}
