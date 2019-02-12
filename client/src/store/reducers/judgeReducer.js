// import action
import { CREATE_JUDGE, CLEAR_JUDGES_LIST, GET_JUDGES_PWD } from "../actions/types";

const initialState = {
    selectedJudge: {
        isAuthenticated: false,
        infos: {},
        finale: "",
        prenom: "",
        nom: "",
        numero: "",
        tel: "",
        courriel: ""
    },
    judgesList: []
};

const jugeReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_JUDGE:
            return { ...state, judgesList: [...state.judgesList, action.payload] };
        case GET_JUDGES_PWD:
            return { ...state, judgesList: action.payload };
        case CLEAR_JUDGES_LIST:
            return { ...state, judgesList: [] };
        default:
            return state;
    }
};

export default jugeReducer;
