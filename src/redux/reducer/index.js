import { combineReducers } from "redux";
import menu from "./menu";
import lang from "./lang";
import auth from "./auth";
import filter from "./filter";
import page from "./page";
import wheel from "./wheel";

export default combineReducers({
  page,
  wheel,
  filter,
  lang,
  menu,
  auth,
});
