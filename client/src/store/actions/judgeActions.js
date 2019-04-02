import {
	SET_CURRENT_USER,
	GET_ERRORS,
	CREATE_JUDGE,
	CLEAR_JUDGES_LIST,
	SET_ACTION_RESPONSE,
	CLEAR_ERRORS,
	DELETE_JUDGE,
	GET_JUDGES_PWD,
	GET_JUDGE_PROJECTS,
	GET_JUDGES_LIST
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthHeaders";
import jwt_decode from "jwt-decode";
import { SelectFinalById } from "./finalActions";

export const Login = (userData, history) => dispatch => {
	axios
		.post("/api/judge/login", userData)
		.then(result => {
			dispatch({ type: GET_ERRORS, payload: result.data });
			const { token } = result.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(SetCurrentJudge(decoded));
			dispatch(SelectFinalById(decoded.finalId));
			history.push("/mon-jugement");
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SetCurrentJudge = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const SetJudgeNumber = (judgeNumber, judgeId, finalId) => dispatch => {
	axios
		.put("/api/judge/set-number", { judgeNumber, judgeId, finalId })
		.then(judge => {
			//UPDATE LIST
			//dispatch({ type: CREATE_JUDGE, payload: judge.data });
			dispatch(GetJudgesPwd(finalId));
		})
		.catch(err => {
			dispatch(GetJudgesPwd(finalId));
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const LogoutJudge = () => dispatch => {
	//removes from localstorage
	localStorage.removeItem("jwtToken");
	//resets requests authorization header
	setAuthToken(false);
	//Set current user to {}
	//set isAuthenticated to false
	dispatch(SetCurrentJudge({}));
	//Redirects to login
	window.location.href = "/";
};

export const CreateJudge = judgeInfos => dispatch => {
	axios
		.post("/api/judge/create", judgeInfos)
		.then(newJudge => {
			dispatch({ type: CREATE_JUDGE, payload: newJudge.data });
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const AddNewJudge = judgeInfos => dispatch => {
	axios
		.post("/api/judge/add-new", judgeInfos)
		.then(newJudge => {
			dispatch({ type: CREATE_JUDGE, payload: newJudge.data });
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SelectJudgesByFinalId = finalId => dispatch => {
	axios
		.get("/api/judge/final-id", { params: { finalId } })
		.then(judgesList => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGES_LIST, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_JUDGES_LIST, payload: judgesList.data });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGES_LIST, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const ClearJudgesList = () => dispatch => {
	dispatch({ type: CLEAR_JUDGES_LIST });
};

export const GetJudgeProject = (finalId, judgeNumber) => dispatch => {
	axios
		.get("/api/judge/projects", { params: { finalId, judgeNumber } })
		.then(projectsList => {
			dispatch({
				type: GET_JUDGE_PROJECTS,
				payload: projectsList.data
			});
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGE_PROJECTS, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGE_PROJECTS, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetJudgesPwd = finalId => dispatch => {
	axios
		.get("/api/judge/pwd", { params: { finalId } })
		.then(response => {
			dispatch({
				type: GET_JUDGES_PWD,
				payload: response.data
			});
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGES_PWD, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_JUDGES_PWD, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const DeleteAllFinalJudges = finalId => dispatch => {
	axios
		.delete("/api/judge/delete-final-all", { params: { finalId } })
		.then(response => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_JUDGE, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_JUDGE, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
