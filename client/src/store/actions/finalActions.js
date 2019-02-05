import {
	CREATE_FINAL,
	SET_ACTION_RESPONSE,
	GET_ERRORS,
	CLEAR_ERRORS,
	GET_ALL_FINALS,
	SELECT_FINAL,
	SAVE_FINAL_PAIRING
} from "./types";

import axios from "axios";

export const CreateFinal = finalInfos => dispatch => {
	axios
		.post("/api/final/create", finalInfos)
		.then(newFinal => {
			dispatch({
				type: SET_ACTION_RESPONSE,
				payload: { type: CREATE_FINAL, response: "success" }
			});
			dispatch({ type: CLEAR_ERRORS });
			dispatch({ type: CREATE_FINAL, payload: newFinal.data });
			dispatch(GetAllFinals());
		})
		.catch(err => {
			dispatch({ type: SET_ACTION_RESPONSE, payload: { type: CREATE_FINAL, response: err } });
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

export const GetAllFinals = () => dispatch => {
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

export const GetFinalsFromUser = userId => dispatch => {
	axios
		.get("/api/final/userId", { params: { userId } })
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
