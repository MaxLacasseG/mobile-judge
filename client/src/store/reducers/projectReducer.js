// import action
import {
	CREATE_PROJECT,
	GET_PROJECTS_LIST,
	CLEAR_PROJECTS_LIST,
	GET_JUDGE_PROJECTS,
	GET_PROJECT,
	CLEAR_PROJECT_INFOS
} from "../actions/types";

const initialState = {
	selectedProject: {
		no: "",
		participant1: "",
		participant2: "",
		categorie: "",
		classe: "",
		type: "",
		titre: "",
		jugement: {},
		information: {
			projectInformation: {
				type: ""
			}
		}
	},
	projectsList: []
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PROJECT:
			return { ...state, projectsList: [...state.projectsList, action.payload] };
		case GET_PROJECTS_LIST:
			return { ...state, projectsList: action.payload };
		case GET_JUDGE_PROJECTS:
			return { ...state, projectsList: action.payload };
		case GET_PROJECT:
			return { ...state, selectedProject: action.payload };
		case CLEAR_PROJECTS_LIST:
			return { ...state, projectsList: [] };
		case CLEAR_PROJECT_INFOS:
			return { ...state, selectedProject: initialState.selectedProject };
		default:
			return state;
	}
};

export default projectReducer;
