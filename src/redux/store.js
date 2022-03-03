import { applyMiddleware, createStore } from "redux";
import { loadState } from "./browser-storage";
import thunk from "redux-thunk";
import rootReducer from "./reducer";

const middleware = [thunk];
const loadedState = {
  lang: loadState("lang"),
  auth: loadState("udata", {
    uid: null,
    state: null,
    name: "Guest",
  }),
  page: loadState("page", {
    page: 1,
    lastIndex: 0,
  }),
  cart: loadState("cart", {
    coupon: "string",
    discount: 0,
  }),
};

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const store = createStore(rootReducer, loadedState, bindMiddleware(middleware));

export default store;
