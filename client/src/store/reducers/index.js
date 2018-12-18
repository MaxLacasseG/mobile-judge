import { combineReducers } from "redux";
import authReducer from "./authReducer";
import finalReducer from "./finalReducer";
import projectReducer from "./projectReducer";
import judgeReducer from "./judgeReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";

export default combineReducers({
    auth: authReducer,
    final: finalReducer,
    project: projectReducer,
    judge: judgeReducer,
    error: errorReducer,
    message: messageReducer
});
