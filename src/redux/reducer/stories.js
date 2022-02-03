import { SET_STORIES } from "../action/type";
import { loadState, saveState } from "../browser-storage";

const stories = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_STORIES:
      const oldStories = loadState("stories");
      saveState("stories", {
        ...oldStories,
        ...payload,
      });
      return { ...oldStories, ...payload };

    default:
      return state;
  }
};

export default stories;
