import { GET_POPULARS } from "../action/type";

const populars = (state=[], action)=>{
    const { type, payload } = action;
  switch (type) {
    case GET_POPULARS:
      return {
        ...state,
         popularProductData: payload,
      };

    default:
      return state;
  }
}

export default populars