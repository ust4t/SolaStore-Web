import axios from "axios";
import { saveCookie } from "../../../src/redux/browser-storage";

export default async function createUser(req, res) {
  const { name, lastname, tel, email, password } = req.query;

  try {
    const { data: rnd_id } = await axios.get(
      `https://api.solastore.com.tr/api/Logon/createUserGuidID?sourceProof=${process.env.SOURCE_PROOF}`
    );
    const { data } =
      await axios.post(`https://api.solastore.com.tr/api/User/AddMember?Name=${name}&Surname=${lastname}&Phone=${tel}&UserEmail=${email}&UserPassword=${password}&sourceProof=${process.env.SOURCE_PROOF}
        `);

    saveCookie({
      key: "udata",
      value: {
        uid: data,
        rnd_id,
        state: "user_registered",
      },
      req,
      res,
    });

    res.status(200).json({
      id: data,
      rnd_id,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
