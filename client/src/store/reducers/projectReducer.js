// import action
import { CREATE_PROJECT } from "../actions/types";

const initialState = {
	selectedProject: {
		no: "",
		participant1: "",
		participant2: "",
		categorie: "",
		classe: "",
		type: "",
		titre: "",
		jugement: {}
	},
	projectList: []
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PROJECT:
			const list = this.state.projectList.push(action.payload);
			return { ...state, projectList: list };
		default:
			return state;
	}
};

export default projectReducer;
