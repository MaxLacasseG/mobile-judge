import {
	CREATE_FINAL,
	SET_ACTION_RESPONSE,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_ALL_FINALS,
	SELECT_FINAL,
	SAVE_FINAL_PAIRING,
	DELETE_FINAL,
	SAVE_RESULT,
	CLEAR_FINAL,
	IS_FINAL_ACTIVE
} from "./types";
import axios from "axios";

export const CreateFinal = (finalInfos, userId, isAdmin) => dispatch => {
	axios
		.post("/api/final/create", finalInfos)
		.then(newFinal => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_FINAL, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: CREATE_FINAL, payload: newFinal.data });
			dispatch(GetAllFinals(userId, isAdmin));
		})
		.catch(err => {
			dispatch({ type: SET_ACTION_RESPONSE, payload: { type: CREATE_FINAL, response: err } });
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};
export const CheckFinalActive = finalId => dispatch => {
	axios
		.get("/api/final/active", { params: { finalId } })
		.then(result => {
			dispatch({ type: IS_FINAL_ACTIVE, payload: result.data });
		})
		.catch(err => {
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SelectFinalById = finalId => dispatch => {
	axios
		.get("/api/final/id", { params: { finalId } })
		.then(final => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SELECT_FINAL, response: "success" }
			});
			dispatch({ type: SELECT_FINAL, payload: final.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SELECT_FINAL, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetAllActiveFinalsIds = () => dispatch => {
	axios
		.get("/api/final/all-active-ids")
		.then(finalList => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_ALL_FINALS, payload: finalList.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_ALL_FINALS, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetAllFinals = (id, isAdmin) => dispatch => {
	if (isAdmin) {
		dispatch(GetFinalsFromAdmin());
	} else {
		dispatch(GetFinalsFromUser(id));
	}
};

export const GetFinalsFromAdmin = () => dispatch => {
	axios
		.get("/api/final/all")
		.then(finalList => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_ALL_FINALS, payload: finalList.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_ALL_FINALS, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const GetFinalsFromUser = adminId => dispatch => {
	axios
		.get("/api/final/admin-id", { params: { adminId } })
		.then(finalList => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: GET_ALL_FINALS, payload: finalList.data });
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: GET_ALL_FINALS, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const ToggleFinalActivation = (finalId, isAdmin = false, userId = null) => dispatch => {
	axios
		.put("/api/final/activate-final", { finalId })
		.then(result => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch(GetAllFinals(userId, isAdmin));
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_FINAL, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SaveFinalPairing = pairingInfos => dispatch => {
	axios
		.post("/api/final/pairing", pairingInfos)
		.then(finalInfos => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_FINAL_PAIRING, response: "success" }
			});
			dispatch(SelectFinalById(finalInfos.data._id));
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_FINAL_PAIRING, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const UpdateFinalPairing = pairingInfos => dispatch => {
	axios
		.put("/api/final/pairing", pairingInfos)
		.then(finalInfos => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_FINAL_PAIRING, response: "success" }
			});
			dispatch(SelectFinalById(pairingInfos._id));
		})
		.catch(err => {
			console.log("err", err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_FINAL_PAIRING, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const DeleteFinal = (finalId, history, userId, isAdmin) => dispatch => {
	axios
		.delete("/api/final", { params: { finalId } })
		.then(result => {
			dispatch({ type: CLEAR_ERRORS });
			dispatch(GetAllFinals(userId, isAdmin));
			window.setTimeout(() => {
				history.push("/admin/panneau-controle");
			}, 1000);
		})
		.catch(err => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: DELETE_FINAL, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const SaveResult = (
	finalId,
	judgeNumber,
	projectNumber,
	period,
	results,
	total,
	isComplete,
	isAdmin,
	history
) => dispatch => {
	axios
		.post("/api/final/save-result", {
			finalId,
			judgeNumber,
			projectNumber,
			period,
			results,
			total,
			isComplete
		})
		.then(response => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_RESULT, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
		})
		.then(response => {
			//IF isAdmin, GO TO project view panel
			if (isAdmin) {
				//console.log("save result", finalId);
				dispatch(SelectFinalById(finalId));
				history.push(`/admin/finale/${finalId}/vue-projets`);
			} //ELSE , GO TO project judge dashboard
			else {
				history.push("/mon-jugement");
			}
		})
		.catch(err => {
			console.log(err);
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: SAVE_RESULT, response: "fail" }
			});
			dispatch({ type: GET_ERRORS, payload: err.response.data });
		});
};

export const ClearSelectedFinal = () => dispatch => {
	dispatch({
		type: CLEAR_FINAL
	});
};
