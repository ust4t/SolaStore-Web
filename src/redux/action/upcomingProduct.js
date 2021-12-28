import { fatchData } from "../../utils/fatchData";
import { GET_UPCOMING_PRODUCT } from "./type";

export const getUpcomingProduct = () => async (dispatch) => {
  dispatch({
    type: GET_UPCOMING_PRODUCT,
    payload: await fatchData("/static/upcomingProduct.json"),
  });
};
