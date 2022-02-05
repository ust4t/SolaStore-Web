import axios from "axios";

export default async function updateUser(req, res) {
  const { name, lastname, email, password, oldPassword, tel } = req.body;
  try {
    await axios.post(
      `https://api.solastore.com.tr/api/User/UpdateMemberName?Name=${name}&Surname=${lastname}&UserEmail=${email}&UserPassword=${oldPassword}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    await axios.post(
      `https://api.solastore.com.tr/api/User/UpdateMemberPhone?Phone=${tel}&UserEmail=${email}&UserPassword=${oldPassword}&sourceProof=${process.env.SOURCE_PROOF}`
    );
    await axios.post(
      `https://api.solastore.com.tr/api/User/UpdateMemberPassword?NewPassword=${password}&UserEmail=${email}&UserPassword=${oldPassword}&sourceProof=${process.env.SOURCE_PROOF}`
    );

    res.status(200).json({
      message: "success",
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
}
