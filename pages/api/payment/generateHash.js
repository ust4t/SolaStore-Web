import axios from "axios";

export default async function generateHash(req, res) {
  try {
    const { data } = await axios.post(
      "https://api.solastore.com.tr/api/Helpers/GenerateHash",
      { ...req.body, sourceProof: process.env.SOURCE_PROOF }
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error.message,
      },
    });
  }
}
