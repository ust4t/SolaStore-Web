import { fatchData } from "../../utils/fatchData";
import { BRAND, HOME_1, HOME_2, HOME_3, HOME_4, HOME_5 } from "./type";

export const getHome1 = () => async (dispatch) => {
  dispatch({
    type: HOME_1,
    payload: await fatchData("/static/home1.json"),
  });
};

export const getHome2 = () => async (dispatch) => {
  dispatch({
    type: HOME_2,
    payload: await fatchData("/static/home2.json"),
  });
};

export const getHome3 = () => async (dispath) => {
  dispath({ type: HOME_3, payload: await fatchData("/static/home3.json") });
};

export const getHome4 = () => async (dispatch) => {
  dispatch({ type: HOME_4, payload: await fatchData("/static/home4.json") });
};

export const getHome5 = () => async (dispatch) => {
  dispatch({
    type: HOME_5,
    payload: await fatchData("/static/home5.json"),
  });
};

export const getBrand = () => async (dispatch) => {
  dispatch({
    type: BRAND,
    payload: await fatchData("/static/brand.json"),
  });
};
