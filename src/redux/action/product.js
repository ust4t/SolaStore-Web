import { fatchData } from "../../utils/fatchData";
import { GET_PRODUCT, GET_SINGLE, SET_PRODUCT } from "./type";

export const getProducts = (data) => async (dispatch) => {
  dispatch({
    type: GET_PRODUCT,
    payload: data,
  });
};
export const getSingleProduct = (product) => (dispatch) => {
  // const data = await fatchData("/static/product.json");
  dispatch({
    type: GET_SINGLE,
    payload: data.find((data) => data.id === Number(id)),
  });
};
