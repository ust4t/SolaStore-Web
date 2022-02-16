import axios from "axios";

export default async function (req, res) {
  const { phone, title } = req.query;
  try {
    await axios.post(
      "https://api.solastore.com.tr/api/Helpers/WeCallYou",
      null,
      {
        params: {
          phoneNumber: phone,
          BaslikBilgisi: title,
          sourceProof: process.env.SOURCE_PROOF,
        },
      }
    );

    await res.status(200).json({
      message: "success",
    });
  } catch (error) {
    await res.status(500).json({ message: error.message });
  }
}
