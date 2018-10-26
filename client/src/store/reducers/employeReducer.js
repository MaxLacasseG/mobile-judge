// import action
import { ADD_EMPLOYE, GET_CURRENT_EMPLOYE } from "../actions/types";
const initialState = {
    employesListe: [],
    employeActif: {}
};
const employeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CURRENT_EMPLOYE:
            return { ...state, employeActif: action.payload };
        case ADD_EMPLOYE:
            return;
        default:
            return state;
    }
};

export default employeReducer;
