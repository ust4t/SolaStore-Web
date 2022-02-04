import axios from "axios";
import { saveCookie } from "../../../src/redux/browser-storage";

export default async function loginUser(req, res) {
  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/Logon/createUserGuidID?sourceProof=${process.env.SOURCE_PROOF}`
    );

    saveCookie({
      key: "udata",
      value: {
        uid: data,
        state: "guest",
        name: `Guest`,
      },
      req,
      res,
    });

    res.status(200).json({
      uid: data,
      state: "guest",
      name: "Guest",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
}
