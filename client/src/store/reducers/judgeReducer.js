// import action
import {} from "../actions/types";

const initialState = {
    isAuthenticated: false,
    infos: {},
    finale: "",
    prenom: "",
    nom: "",
    numero: "",
    tel: "",
    courriel: ""
};

const jugeReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default jugeReducer;