import { CREATE_USER_ID } from "../action/type";
import { saveState } from "../browser-storage";

const initialState = {
  uid: null,
  state: null,
  name: "Guest",
};

const auth = (state = initialState, action) => {
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
