import axios from "axios";

export default async function createUserId(req, res) {
  const { email, password } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/User/IsMemberByEmail?UserEmail=${email}&UserPassword=${password}&sourceProof=${process.env.SOURCE_PROOF}`
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
