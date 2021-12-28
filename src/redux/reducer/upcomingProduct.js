import { GET_UPCOMING_PRODUCT } from "../action/type";

const upcomingProduct = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_UPCOMING_PRODUCT:
      return payload;
    default:
      return state;
  }
};
export default upcomingProduct;
