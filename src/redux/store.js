import { applyMiddleware, createStore, compose } from "redux";
import { loadState } from "./browser-storage";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
const loadedState = { lang: loadState("lang") };

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, loadedState, bindMiddleware(middleware));

export default store;
