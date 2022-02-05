import axios from "axios";

export default async function addOrderVisitor(req, res) {
  try {
    const { data } = await axios.post(
      `https://api.solastore.com.tr/api/Order/AddOrderVisitorNew?sourceProof=${process.env.SOURCE_PROOF}`,
      req.body
    );
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: {
        message: error,
      },
    });
  }
}
