import { CREATE_USER_ID, RESET_USER_ID } from "../action/type";

const initialState = {
  uid: null,
  state: null,
  name: "Guest",
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_USER_ID:
      return payload;

    default:
      return state;
  }
};

export default auth;
