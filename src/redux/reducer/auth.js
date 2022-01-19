import { CREATE_USER_ID } from "../action/type";
import { saveState } from "../browser-storage";

const auth = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER_ID:
      saveState("udata", payload);
      return {
        ...state,
        payload,
      };

    default:
      return state;
  }
};

export default auth;
