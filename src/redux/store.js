import { applyMiddleware, createStore } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import storage from "./sync_storage";

const initialState = {
  lang: {
    lang: "ru",
  },
};

const middleware = [thunk];

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(rootReducer, initialState, bindMiddleware(middleware));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["lang"],
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
      persistedReducer,
      initialState,
      bindMiddleware(middleware)
    );
    store.__persistor = persistStore(store);
    return store;
  }
};

export const wrapper = createWrapper(makeStore);
