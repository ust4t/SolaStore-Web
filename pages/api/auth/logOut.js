import axios from "axios";
import { saveCookie } from "../../../src/redux/browser-storage";

export default async function loginUser(req, res) {
  const { email, password } = req.query;

  try {
    saveCookie({
      key: "udata",
      value: {},
      req,
      res,
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
}
