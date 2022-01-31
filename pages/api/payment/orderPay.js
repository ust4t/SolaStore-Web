import axios from "axios";
import qs from "qs";

export default async function orderPay(req, res) {
  const formData = {
    ...req.body,
    clientid: "190320263",
    storetype: "3d_pay",
    islemtipi: "Auth",
    currency: "840",
    okUrl: "https://api.solastore.com.tr/api/Helpers/CCSuccess",
    failUrl: "https://api.solastore.com.tr/api/Helpers/CCFail",
    sourceProof: process.env.SOURCE_PROOF,
  };
  try {
    const options = {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: qs.stringify(formData),
      url: "https://sanalpos2.ziraatbank.com.tr/fim/est3Dgate",
    };
    const { data } = await axios(options);
    res.status(200).json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
}
