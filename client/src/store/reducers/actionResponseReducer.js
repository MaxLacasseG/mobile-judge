import { SET_ACTION_RESPONSE, CLEAR_ACTION_RESPONSE } from "../actions/types";

const initialState = {
    response: ""
};

export default function(state = initialState, action) {
    switch (action.type) {
        case SET_ACTION_RESPONSE:
            return {
                ...state,
                response: action.payload
            };
        case CLEAR_ACTION_RESPONSE:
            return initialState;
        default:
            return state;
    }
}
