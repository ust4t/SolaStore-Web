import { SET_DETAILS } from "./types";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DETAILS:
      return {
        ...state,
        detailVariants: action.payload,
      };

    default:
      return state;
  }
}
