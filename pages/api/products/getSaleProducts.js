import axios from "axios";

export default async function getSaleProducts(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Product/GetSaleProducts?lang=tr&sourceProof=${process.env.SOURCE_PROOF}`
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
