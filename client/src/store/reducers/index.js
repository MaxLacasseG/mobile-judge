import { combineReducers } from "redux";
import employeReducer from "./employeReducer";
import authReducer from "./authReducer";
import erreurReducer from "./erreurReducer";

export default combineReducers({
    employe: employeReducer,
    auth: authReducer,
    erreur: erreurReducer
});
