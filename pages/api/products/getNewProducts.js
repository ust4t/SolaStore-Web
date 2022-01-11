import axios from "axios";

export default async function getNewProducts(req, res) {
  const { lang } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Product/GetNewProducts?lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    res.status(200).json({
      data: data.reverse(),
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
