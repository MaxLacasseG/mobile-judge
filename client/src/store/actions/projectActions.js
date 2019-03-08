import {
	GET_ERRORS,
	CREATE_PROJECT,
	SET_ACTION_RESPONSE,
	CLEAR_ERRORS,
	GET_PROJECTS_LIST,
	CLEAR_PROJECTS_LIST,
	DELETE_PROJECT,
	GET_PROJECT,
	CLEAR_PROJECT_INFOS
} from "./types";
import axios from "axios";
import { ResetProjectJudgement } from "./finalActions";
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

export const DeleteAllFinalProjects = finalId => dispatch => {
	axios
		.delete("/api/project/delete-final-all", { params: { finalId } })
		.then(response => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_PROJECT, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_PROJECT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetProjectInfos = (finalId, projectNumber) => dispatch => {
	axios
		.get("/api/project/number", { params: { finalId, projectNumber } })
		.then(project => {
			dispatch({ type: GET_PROJECT, payload: project.data });
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECT, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SwitchProjectType = (projectId, newType) => dispatch => {
	axios
		.put("/api/project/switch-type", { projectId, newType })
		.then(savedProject => {
			savedProject = savedProject.data;
			const finalId = savedProject.finalId;
			const projectNumber = savedProject.number;

			//ResetResults
			dispatch(ResetProjectJudgement(finalId, projectNumber));
			dispatch(SelectProjectsByFinalId(finalId));

			//Dispatch GetProjects
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECT, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_PROJECT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const ClearProjectInfos = () => dispatch => {
	dispatch({ type: CLEAR_PROJECT_INFOS });
};
