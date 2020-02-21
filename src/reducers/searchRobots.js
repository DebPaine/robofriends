import { CHANGE_SEARCHFIELD } from '../types';

const initialState = {
	searchField: ''
};

export const searchRobots = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case CHANGE_SEARCHFIELD:
			return { ...state, searchField: payload };
		default:
			return state;
	}
};
