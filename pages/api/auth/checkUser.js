import axios from "axios";

export default async function checkUser(req, res) {
  try {
    const userData = JSON.parse(req.cookies["udata"] || false);

    if (userData && userData.uid) {
      res.status(200).json({
        ...userData,
      });
    } else {
      const { data } = await axios.get(
        `https://api.solastore.com.tr/api/Logon/createUserGuidID?sourceProof=${process.env.SOURCE_PROOF}`
      );
      res.status(200).json({
        uid: data,
        state: "guest",
        name: "Guest",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
