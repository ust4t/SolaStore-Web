import axios from "axios";
import qs from "qs";

export default async function orderPay(req, res) {
  const formData = {
    clientid: "190320263",
    storetype: "3d_pay",
    hash: "xSxXh0SErIX8yEvk5cL46qNqS5w=",
    islemtipi: "Auth",
    amount: "276",
    currency: "840",
    oid: "4823",
    okUrl: "https://api.solastore.com.tr/api/Helpers/CCSuccess",
    failUrl: "https://api.solastore.com.tr/api/Helpers/CCFail",
    lang: "tr",
    rnd: "8596",
    pan: "5188960005010366",
    Ecom_Payment_Card_ExpDate_Year: "24",
    Ecom_Payment_Card_ExpDate_Month: "11",
    cv2: "160",
    sourceProof: "ugurturkmenn@gmail.com",
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
