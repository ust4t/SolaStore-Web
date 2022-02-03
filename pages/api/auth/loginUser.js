import axios from "axios";
import { saveCookie } from "../../../src/redux/browser-storage";

export default async function createUserId(req, res) {
  const { email, password } = req.query;

  try {
    const { data } = await axios.get(
      `https://api.solastore.com.tr/api/User/IsMemberByEmail?UserEmail=${email}&UserPassword=${password}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    saveCookie({
      key: "udata",
      value: {
        uid: data.userID,
        state: "user_registered",
        name: `${data.userName} ${data.userSurname}`,
      },
      req,
      res,
    });

    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
}
