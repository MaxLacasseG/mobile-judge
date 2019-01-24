import {
	SET_CURRENT_USER,
	GET_ERRORS,
	GET_MESSAGE,
	CREATE_JUDGE,
	SET_ACTION_RESPONSE,
	CLEAR_ERRORS
} from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthHeaders";
import jwt_decode from "jwt-decode";

export const judgeLogin = (userData, history) => dispatch => {
	axios
		.post("/api/juges/connexion", userData)
		.then(result => {
			const { token } = result.data;
			localStorage.setItem("jwtToken", token);
			setAuthToken(token);
			const decoded = jwt_decode(token);
			dispatch(setCurrentJudge(decoded));
			history.push("/selection-finale");
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const setCurrentJudge = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	};
};

export const logoutJudge = () => dispatch => {
	//removes from localstorage
	localStorage.removeItem("jwtToken");
	//resets requests authorization header
	setAuthToken(false);
	//Set current user to {}
	//set isAuthenticated to false
	dispatch(setCurrentJudge({}));
	//Redirects to login
	window.location.href = "/";
};

export const oubliMdp = courriel => dispatch => {
	axios
		.post("/api/utilisateur/oubli-mdp", { courriel })
		.then(result => {
			dispatch({ type: GET_MESSAGE, payload: result.data });
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const changementMdp = (token, mdp) => dispatch => {
	axios
		.post("/api/utilisateur/reinit-mdp", { token, mdp })
		.then(result => {
			dispatch({ type: GET_MESSAGE, payload: result.data });
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const CreateJudge = judgeInfos => dispatch => {
	axios
		.post("/api/judge/create", judgeInfos)
		.then(newJudge => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: CREATE_JUDGE, payload: newJudge.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_JUDGE, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
