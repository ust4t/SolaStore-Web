import { combineReducers } from "redux";
import menu from "./menu";
import lang from "./lang";
import auth from "./auth";
import filter from "./filter";
import page from "./page";

export default combineReducers({
  page,
  filter,
  lang,
  menu,
  auth,
});
