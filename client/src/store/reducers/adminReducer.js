import { ADD_NEW_ADMIN, GET_ALL_ADMIN, DELETE_ADMIN } from "../actions/types";

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
        case DELETE_ADMIN:
            return {
                ...state,
                selectedAdmin: action.payload
            };
        default:
            return state;
    }
}
