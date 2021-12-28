import { fatchData } from "../../utils/fatchData";
import { TOP_SELLER } from "./type";

export const getTopSeller = () => async (dispatch) => {
  dispatch({
    type: TOP_SELLER,
    payload: await fatchData("/static/seller.json"),
  });
};
