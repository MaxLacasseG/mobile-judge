// import action
import { CREATE_FINAL, GET_ALL_FINALS, CLEAR_FINAL, SELECT_FINAL } from "../actions/types";

const initialState = {
	selectedFinal: {},
	finalList: []
};

const jugeReducer = (state = initialState, action) => {
	switch (action.type) {
		case CLEAR_FINAL:
			return { ...state, selectedFinal: {} };
		case GET_ALL_FINALS:
			return { ...state, finalList: action.payload };
		case CREATE_FINAL:
		case SELECT_FINAL:
			return { ...state, selectedFinal: action.payload };
		default:
			return state;
	}
};

export default jugeReducer;
