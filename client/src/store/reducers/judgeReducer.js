// import action
import { CREATE_JUDGE } from "../actions/types";

const initialState = {
	selectedJudge: {
		isAuthenticated: false,
		infos: {},
		finale: "",
		prenom: "",
		nom: "",
		numero: "",
		tel: "",
		courriel: ""
	},
	judgesList: []
};

const jugeReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_JUDGE:
			const list = this.state.judgesList.push(action.payload);
			return { ...state, judgesList: list };
		default:
			return state;
	}
};

export default jugeReducer;
