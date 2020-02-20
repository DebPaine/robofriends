import { CHANGE_SEARCHFIELD } from './types';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCHFIELD,
	payload: text
});
