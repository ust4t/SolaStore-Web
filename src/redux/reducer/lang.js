import { getLocalStorage, setLocalStorage } from "../../utils/localstorage";
import { CHANGE_LANG, GET_LANG } from "../action/type";

const lang = (state = "ru", action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANG:
      setLocalStorage("lang", payload);
      return {
        ...state,
        lang: payload,
      };

    case GET_LANG:
      return {
        ...state,
        lang: payload,
      };
    default:
      return state;
  }
};

export default lang;
