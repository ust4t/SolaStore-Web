import { SET_CART_DATA_REDUX } from "../action/type";
import { saveState } from "../browser-storage";

const cart = (
  state = {
    coupon: "",
    discount: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CART_DATA_REDUX: {
      saveState("cart", payload);
      return payload;
    }

    default:
      return state;
  }
};
export default cart;
