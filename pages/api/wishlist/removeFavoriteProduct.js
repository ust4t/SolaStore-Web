import axios from "axios";

export default async function removeFavoriteProduct(req, res) {
  const { user, productID } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/User/DeleteFavoriteProduct?UserID=${user}&ProductID=${productID}&sourceProof=${process.env.SOURCE_PROOF}`
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
