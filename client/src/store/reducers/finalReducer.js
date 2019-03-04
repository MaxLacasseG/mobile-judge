// import action
import {
	CREATE_FINAL,
	GET_ALL_FINALS,
	CLEAR_FINAL,
	SELECT_FINAL,
	IS_FINAL_ACTIVE
} from "../actions/types";

const initialState = {
	selectedFinal: {},
	finalList: [],
	isActive: false
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
		case IS_FINAL_ACTIVE:
			return { ...state, isActive: action.payload };
		default:
			return state;
	}
};

export default jugeReducer;
