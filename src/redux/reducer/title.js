import { SET_TITLE } from '../action/type';

const title = (state = 'Shop', action) => {
	const { type, payload } = action;
	switch (type) {
		case SET_TITLE:
			return payload;
		default:
			return state;
	}
};

export default title;
