import { ADD_NEW_ADMIN, UPDATE_ADMIN, GET_ALL_ADMIN, DELETE_ADMIN, CLEAR_SELECTED_ADMIN } from "../actions/types";

const initialState = {
    adminList: [],
    selectedAdmin: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ADMIN:
            return {
                ...state,
                adminList: action.payload
            };
        case ADD_NEW_ADMIN:
            return {
                ...state,
                selectedAdmin: action.payload
            };
        case UPDATE_ADMIN:
            return {
                ...state,
                selectedAdmin: action.payload
            };
        case DELETE_ADMIN:
            return {
                ...state,
                selectedAdmin: action.payload
            };
        case CLEAR_SELECTED_ADMIN:
            return {
                ...state,
                selectedAdmin: {}
            };
        default:
            return state;
    }
}
