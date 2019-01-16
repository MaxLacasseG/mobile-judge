import { ADD_NEW_ADMIN, SET_ACTION_RESPONSE, GET_ERRORS, CLEAR_ERRORS, GET_ALL_ADMIN } from "./types";

import axios from "axios";

export const AddAdmin = adminInfos => dispatch => {
    axios
        .post("/api/admin/register", adminInfos)
        .then(adminList => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: ADD_NEW_ADMIN, response: "success" } });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: ADD_NEW_ADMIN, payload: adminList.data });
        })
        .catch(err => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: ADD_NEW_ADMIN, response: "success" } });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const GetAllAdmins = () => dispatch => {
    axios
        .get("/api/admin/all")
        .then(adminList => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: GET_ALL_ADMIN, response: "success" } });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: GET_ALL_ADMIN, payload: adminList.data });
        })
        .catch(err => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: { type: GET_ALL_ADMIN, response: "fail" } });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};
