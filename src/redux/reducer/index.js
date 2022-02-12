import { combineReducers } from "redux";
import menu from "./menu";
import lang from "./lang";
import auth from "./auth";
import filter from "./filter";

export default combineReducers({
  filter,
  lang,
  menu,
  auth,
});
