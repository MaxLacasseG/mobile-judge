import { ADD_NEW_ADMIN, SET_ACTION_RESPONSE, GET_ERRORS, CLEAR_ERRORS } from "./types";

import axios from "axios";

export const AddAdmin = adminInfos => dispatch => {
    axios
        .post("/api/admin/register", adminInfos)
        .then(adminList => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: "success" });
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: ADD_NEW_ADMIN, payload: adminList.data });
        })
        .catch(err => {
            dispatch({ type: SET_ACTION_RESPONSE, payload: "fail" });
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};
