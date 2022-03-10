import { CHANGE_LANG, GET_LANG, SET_COUNTRY } from "../action/type";
import { saveState } from "../browser-storage";

const lang = (
  state = {
    lang: "ru",
    hasChanged: false,
    location: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANGE_LANG:
      saveState("lang", {
        ...state,
        ...payload,
      });
      return {
        ...state,
        ...payload,
      };
    case GET_LANG:
      return {
        ...state,
        ...payload,
      };
    // return payload;
    case SET_COUNTRY:
      return {
        ...state,
        location: payload,
      };
    default:
      return state;
  }
};

export default lang;
