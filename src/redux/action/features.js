import { fatchData } from "../../utils/fatchData";
import { GET_FEATURES } from "./type";

export const getFeatures = () => async (dispatch) => {
  dispatch({
    type: GET_FEATURES,
    payload: await fatchData("/static/features.json"),
  });
};
