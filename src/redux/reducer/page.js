import { SET_STORY_PAGE } from "../action/type";
import { saveState } from "../browser-storage";

const menu = (
  state = {
    page: 1,
    lastIndex: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STORY_PAGE: {
      saveState("page", payload);
      return payload;
    }

    default:
      return state;
  }
};
export default menu;
