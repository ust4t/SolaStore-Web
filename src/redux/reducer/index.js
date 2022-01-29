import { combineReducers } from 'redux';
import menu from './menu';
import lang from './lang';
import auth from './auth';
import title from './title';

export default combineReducers({
	lang,
	menu,
	auth,
	title,
});
