import { combineReducers } from "redux";
import authReducer from "./authReducer";
import finaleReducer from "./finaleReducer";
import projetReducer from "./projetReducer";
import jugeReducer from "./jugeReducer";
import erreurReducer from "./erreurReducer";

export default combineReducers({
	auth: authReducer,
	finale: finaleReducer,
	projet: projetReducer,
	juge: jugeReducer,
	erreur: erreurReducer
});
