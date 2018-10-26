import { SET_CURRENT_USER } from "../actions/types";
import isEmpty from "../../validation/isEmpty";

const initialState = {
    isAuthenticated: false,
    utilisateur: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                utilisateur: action.payload
            };
        default:
            return state;
    }
}
