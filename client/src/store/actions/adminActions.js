import {
	ADD_NEW_ADMIN,
	SET_ACTION_RESPONSE,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_ALL_ADMIN,
	DELETE_ADMIN,
	UPDATE_ADMIN
} from "./types";

import axios from "axios";
import { logoutUser } from "./authActions";

export const AddAdmin = adminInfos => dispatch => {
	axios
		.post("/api/admin/register", adminInfos)
		.then(newAdmin => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: ADD_NEW_ADMIN, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: ADD_NEW_ADMIN, payload: newAdmin.data });
			dispatch(GetAllAdmins());
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: ADD_NEW_ADMIN, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const InitPwd = userInfos => dispatch => {
	axios
		.put("/api/admin/init-pwd", userInfos)
		.then(utilisateur => {
			dispatch(logoutUser());
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const UpdateAdmin = adminInfos => dispatch => {
	axios
		.put("/api/admin/update", adminInfos)
		.then(modifiedAdmin => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: UPDATE_ADMIN, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: UPDATE_ADMIN, payload: modifiedAdmin.data });
			dispatch(GetAllAdmins());
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: UPDATE_ADMIN, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const DeleteAdmin = adminId => dispatch => {
	axios
		.delete("/api/admin/id", { params: { adminId } })
		.then(deletedAdmin => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_ADMIN, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: DELETE_ADMIN, payload: deletedAdmin.data });
			dispatch(GetAllAdmins());
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_ADMIN, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetAllAdmins = () => dispatch => {
	axios
		.get("/api/admin/all")
		.then(adminList => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_ALL_ADMIN, payload: adminList.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_ALL_ADMIN, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
