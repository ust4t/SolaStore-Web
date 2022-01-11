import { getLocalStorage, setLocalStorage } from "../../utils/localstorage";
import { CHANGE_LANG } from "../action/type";

const lang = (state = "ru", action) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANG:
      return {
        ...state,
        lang: payload,
      };

    default:
      return state;
  }
};

export default lang;
