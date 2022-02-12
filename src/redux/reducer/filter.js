import { FILTER_BRAND, FILTER_CAT, FILTER_PRICE } from "../action/type";

const initialState = {
  category: [],
  brand: [],
  price: "",
};

const filter = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FILTER_CAT:
      return {
        ...state,
        category: payload,
      };
    case FILTER_BRAND:
      return {
        ...state,
        brand: payload,
      };
    case FILTER_PRICE:
      return {
        ...state,
        price: payload,
      };
    default:
      return state;
  }
};

export default filter;
