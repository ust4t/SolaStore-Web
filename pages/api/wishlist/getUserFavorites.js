export default async function getUserFavorites(req, res) {
  const { lang, user } = req.query;
  try {
    const response = await fetch(
      `https://api.solastore.com.tr/api/User/GetUserFavoritesList?UserID=${user}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
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
