export default async function menuFetch(req, res) {
  const { lang } = req.query;
  try {
    const response = await fetch(
      `https://api.solastore.com.tr/api/Category/GetAll?lang=${
        lang || "tr"
      }&sourceProof=${process.env.SOURCE_PROOF}`
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
