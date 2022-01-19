import axios from "axios";

export default async function getUserFavorites(req, res) {
  const { lang, user } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/User/GetUserFavoritesList?UserID=${user}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
