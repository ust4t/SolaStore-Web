import { SET_WHEEL_DATA, SET_WHEEL_MODAL } from "../action/type";

const wheel = (
  state = {
    showWheel: false,
    wheelData: [],
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_WHEEL_MODAL: {
      return {
        ...state,
        showWheel: payload,
      };
    }

    case SET_WHEEL_DATA: {
      return {
        ...state,
        wheelData: payload,
      };
    }

    default:
      return state;
  }
};
export default wheel;
