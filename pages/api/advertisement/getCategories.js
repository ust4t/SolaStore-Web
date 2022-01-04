import axios from "axios";

export default async function getCategories(req, res) {
  try {
    const response = await axios.get(
      `https://api.solastore.com.tr/api/Advertising/CampaignPictruresByLang?sourceProof=${process.env.SOURCE_PROOF}&lang=1`
    );
    res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}