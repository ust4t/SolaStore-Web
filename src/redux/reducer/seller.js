import { TOP_SELLER } from "../action/type";

const seller = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case TOP_SELLER:
      return {
        topSeller: payload.topSellers,
      };
    default:
      return state;
  }
};
export default seller;
