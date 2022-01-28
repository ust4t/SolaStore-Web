import { CHANGE_LANG, GET_LANG } from '../action/type';
import { saveState } from '../browser-storage';

const lang = (state = 'ru', action) => {
	const { type, payload } = action;
	switch (type) {
		case CHANGE_LANG:
			saveState('lang', payload);
			return payload;
		case GET_LANG:
			return {
				...state,
				lang: payload,
			};
		default:
			return state;
	}
};

export default lang;
