import {
	GET_ERRORS,
	CREATE_PROJECT,
	SET_ACTION_RESPONSE,
	CLEAR_ERRORS,
	GET_PROJECTS_LIST,
	CLEAR_PROJECTS_LIST
} from "./types";
import axios from "axios";

export const CreateProject = projectInfos => dispatch => {
	axios
		.post("/api/project/create", projectInfos)
		.then(newProject => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_PROJECT, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: CREATE_PROJECT, payload: newProject.data });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_PROJECT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SelectProjectsByFinalId = finalId => dispatch => {
	axios
		.get("/api/project/final-id", { params: { finalId } })
		.then(projectsList => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECTS_LIST, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_PROJECTS_LIST, payload: projectsList.data });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECTS_LIST, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const ClearProjectsList = () => dispatch => {
	dispatch({ type: CLEAR_PROJECTS_LIST });
};
