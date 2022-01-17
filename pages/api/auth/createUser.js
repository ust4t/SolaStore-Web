import axios from "axios";

export default async function createUser(req, res) {
  const { name, lastname, tel, email, password } = req.query;

  try {
    const { data } =
      await axios.post(`https://api.solastore.com.tr/api/User/AddMember?Name=${name}&Surname=${lastname}&Phone=${tel}&UserEmail=${email}&UserPassword=${password}&sourceProof=${process.env.SOURCE_PROOF}
        `);

    res.status(200).json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
    });
  }
}
