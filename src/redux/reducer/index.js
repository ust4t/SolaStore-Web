import { combineReducers } from 'redux';
import features from './features';
import filter from './filter';
import home from './home';
import product from './product';
import seller from './seller';
import upcomingProduct from './upcomingProduct';
import utilis from './utilis';
import populars from './populars';
import menu from './menu';
import lang from './lang';
import brands from './brands';
import auth from './auth';

export default combineReducers({
	lang,
	seller,
	features,
	upcomingProduct,
	product,
	brands,
	filter,
	home,
	utilis,
	populars,
	menu,
	auth,
});
