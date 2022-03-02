import axios from "axios";

export default async function (req, res) {
  try {
    axios.post(
      "https://api.solastore.com.tr/api/Helpers/AddVideoCallMeeting",
      req.body,
      {
        params: {
          sourceProof: process.env.SOURCE_PROOF,
        },
      }
    );

    await res.status(200).json({
      status: "success",
    });
  } catch (e) {
    await res.status(500).json({
      status: "error",
    });
  }
}
