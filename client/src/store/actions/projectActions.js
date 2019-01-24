import { GET_ERRORS, CREATE_PROJECT, SET_ACTION_RESPONSE, CLEAR_ERRORS } from "./types";
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
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_PROJECT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
