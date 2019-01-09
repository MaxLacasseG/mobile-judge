import { ADD_NEW_ADMIN, GET_ALL_ADMIN } from "../actions/types";

const initialState = {
    adminList: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_NEW_ADMIN:
            return {
                ...state,
                adminList: action.payload
            };
        case GET_ALL_ADMIN:
            return {
                ...state,
                adminList: action.payload
            };
        default:
            return state;
    }
}
