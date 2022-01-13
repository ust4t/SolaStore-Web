export default async function getSubMenu(req, res) {
  const { id, lang } = req.query;
  try {
    const response = await fetch(
      `https://api.solastore.com.tr/api/Category/GetSubCategoryList?id=${id}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
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
