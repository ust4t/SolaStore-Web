import { combineReducers } from "redux";
import menu from "./menu";
import lang from "./lang";
import auth from "./auth";
import title from "./title";
import stories from "./stories";

export default combineReducers({
  stories,
  lang,
  menu,
  auth,
  title,
});
