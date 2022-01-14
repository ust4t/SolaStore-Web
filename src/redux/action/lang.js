import { getLocalStorage } from "../../utils/localstorage";
import { GET_LANG } from "./type";

export const getLang = () => (dispatch) => {
  dispatch({
    type: GET_LANG,
    payload: getLocalStorage("lang", ""),
  });
};

export const setLang = (lang) => (dispatch) => {
  dispatch({
    type: GET_LANG,
    payload: lang,
  });
};
