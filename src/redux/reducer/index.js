import { combineReducers } from 'redux';
import menu from './menu';
import lang from './lang';
import auth from './auth';

export default combineReducers({
	lang,
	menu,
	auth,
});
