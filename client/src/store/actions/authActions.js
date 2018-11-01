import { SET_CURRENT_USER, GET_ERRORS, GET_MESSAGE } from "./types";
import axios from "axios";
import setAuthToken from "../../utils/setAuthHeaders";
import jwt_decode from "jwt-decode";

export const login = (userData, history) => dispatch => {
    axios
        .post("/api/utilisateur/connexion", userData)
        .then(result => {
            const { token } = result.data;
            localStorage.setItem("jwtToken", token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            history.push("/finale");
        })
        .catch(err => {
            dispatch({ type: GET_ERRORS, payload: err.response.data });
        });
};

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

export const logoutUser = () => dispatch => {
    //removes from localstorage
    localStorage.removeItem("jwtToken");
    //resets requests authorization header
    setAuthToken(false);
    //Set current user to {}
    //set isAuthenticated to false
    dispatch(setCurrentUser({}));
    //Redirects to login
    window.location.href = "/connexion";
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
