import axios from "axios";

export default async function increaseProductCount(req, res) {
  const { user, ProductID } = req.query;
  try {
    const response = await axios.post(
      `https://api.solastore.com.tr/api/Order/IncreaseProductCountInChart?UserID=${user}&ProductID=${ProductID}&sourceProof=${process.env.SOURCE_PROOF}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          UserID: user,
          ProductID,
        },
      }
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
