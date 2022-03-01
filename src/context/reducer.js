import {
  SET_BUYER_DETAILS,
  SET_CART_DATA,
  SET_COMPLETED_CART,
  SET_WISHLIST_DATA,
} from "./types";

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART_DATA:
      return {
        ...state,
        cartData: action.payload,
      };
    case SET_WISHLIST_DATA:
      return {
        ...state,
        wishlistData: action.payload,
      };
    case SET_COMPLETED_CART:
      return {
        ...state,
        completedCartData: action.payload,
      };
    case SET_BUYER_DETAILS:
      return {
        ...state,
        buyerDetails: action.payload,
      };

    default:
      return state;
  }
}
