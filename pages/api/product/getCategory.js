import axios from "axios";

export default async function (req, res) {
  const { lang, id } = req.query;
  try {
    const { data: category } = await axios.get(
      `https://api.solastore.com.tr/api/Category/GetByProductID?productID=${id}&lang=${lang}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    await res.status(200).json(category);
  } catch (err) {
    await res.status(500).json({
      message: "Something went wrong",
      err,
    });
  }
}
