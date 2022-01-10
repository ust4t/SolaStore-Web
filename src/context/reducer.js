import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  SET_CART_DATA,
  SET_COMPLETED_CART,
  SET_DETAILS,
} from "./types";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_DETAILS:
      return {
        ...state,
        detailVariants: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartQueryName: "addCart",
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartQueryName: "removeFromCart",
      };
    case INCREMENT_QUANTITY:
      return {
        ...state,
        cartQueryName: "incrementQuantity",
      };
    case DECREMENT_QUANTITY:
      return {
        ...state,
        cartQueryName: "decrementQuantity",
      };
    case SET_CART_DATA:
      return {
        ...state,
        cartData: action.payload,
      };
    case SET_COMPLETED_CART:
      return {
        ...state,
        completedCartData: action.payload,
      };

    default:
      return state;
  }
}
