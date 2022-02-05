import axios from "axios";

export default async function getUserByID(req, res) {
  const { id } = req.query;
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/User/GetUserByIDNew?UserID=${id}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    res.status(200).json(data.data);
  } catch (e) {
    res.status(500).json(e.message);
  }
}
