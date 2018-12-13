import { ADD_EMPLOYE, GET_ERRORS, GET_CURRENT_EMPLOYE } from "./types";

import axios from "axios";

export const AjouterEmploye = data => dispatch => {
    axios
        .post("/api/employe/enregistrement", data)
        .then(employeList => {
            console.log(employeList);
            dispatch({ type: ADD_EMPLOYE, payload: employeList.data });
        })
        .catch(err => {
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const GetCurrentEmploye = id => dispatch => {
    axios
        .get("/api/employe/employe-courant", id)
        .then(employe => {
            console.log(employe);
            dispatch({ type: GET_CURRENT_EMPLOYE, payload: employe.data });
        })
        .catch(err => {
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};
