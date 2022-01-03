import axios from "axios";

export default async function menuFetch(req, res) {
  try {
    const response = await axios.get(
      `https://api.solastore.com.tr/api/Advertising/Slider?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
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
