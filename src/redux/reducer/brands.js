import { GET_BRANDS } from "../action/type";

const brands = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BRANDS:
      return {
        ...state,
        brands: payload.data,
      };

    default:
      return state;
  }
};

export default brands;
