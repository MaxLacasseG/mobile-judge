// import action
import {} from "../actions/types";

const initialState = {
    isActive: false,
    isOpen: false,
    nom: "",
    region: "",
    responsable: {},
    listeProjets: [],
    listeJuges: []
};

const jugeReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default jugeReducer;
