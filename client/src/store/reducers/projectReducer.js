// import action
import {} from "../actions/types";

const initialState = {
    no: "",
    participant1: "",
    participant2: "",
    categorie: "",
    classe: "",
    type: "",
    titre: "",
    jugement: {}
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default projectReducer;
