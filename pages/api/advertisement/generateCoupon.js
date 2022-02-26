import axios from "axios";

export default async function (req, res) {
  try {
    const { tel, giftId } = req.query;

    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Advertising/GetPassionFlowerVoucher?phoneNumber=${tel}&giftVoucherID=${giftId}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    await res.status(200).json(data);
  } catch (e) {
    await res.status(500).json(e);
  }
}
