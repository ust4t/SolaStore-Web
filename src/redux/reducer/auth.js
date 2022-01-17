import { CREATE_USER_ID } from "../action/type";

const auth = (state = "", action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER_ID:
      return {
        ...state,
        uid: payload,
      };

    default:
      return state;
  }
};

export default auth;
