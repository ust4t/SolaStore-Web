import { fatchData } from "../../utils/fatchData";
import { GET_POPULARS } from "./type";

export const getPopulars = () => async (dispatch) => {
  dispatch({
    type: GET_POPULARS,
    payload: await fatchData("/api/getPopulars"),
  });
};
