import { CREATE_FINAL, SET_ACTION_RESPONSE, GET_ERRORS, CLEAR_ERRORS, GET_ALL_FINALS, DELETE_FINAL, UPDATE_FINAL } from "./types";

import axios from "axios";

export const CreateFinal = finalInfos => dispatch => {
    axios
        .post("/api/final/create", finalInfos)
        .then(newFinal => {
            console.log(newFinal);
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: CREATE_FINAL, response: "success" } });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: CREATE_FINAL, payload: newFinal.data });
            dispatch(GetAllFinals());
        })
        .catch(err => {
            console.log(err.response);
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: CREATE_FINAL, response: err } });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const UpdateAdmin = adminInfos => dispatch => {
    axios
        .put("/api/admin/update", adminInfos)
        .then(modifiedAdmin => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: UPDATE_FINAL, response: "success" } });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: UPDATE_FINAL, payload: modifiedAdmin.data });
            //dispatch(GetAllFinals());
        })
        .catch(err => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: UPDATE_FINAL, response: "fail" } });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const DeleteAdmin = adminId => dispatch => {
    axios
        .delete("/api/admin/id", { params: { adminId } })
        .then(deletedAdmin => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: DELETE_FINAL, response: "success" } });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: DELETE_FINAL, payload: deletedAdmin.data });
            dispatch(GetAllFinals());
        })
        .catch(err => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: DELETE_FINAL, response: "fail" } });
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
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: GET_ALL_FINALS, response: "fail" } });
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
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: GET_ALL_FINALS, response: "fail" } });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};
