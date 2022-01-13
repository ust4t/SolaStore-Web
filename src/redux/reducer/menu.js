import { GET_MAIN_MENU, GET_SUB_MENU } from "../action/type";

const menu = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MAIN_MENU: {
      return {
        ...state,
        menuData: payload,
      };
    }
    case GET_SUB_MENU: {
      return {
        ...state,
        subMenuData: payload,
      };
    }

    default:
      return state;
  }
};
export default menu;
