import { combineReducers } from "redux";
import authReducer from "./authReducer";
import adminReducer from "./adminReducer";
import finalReducer from "./finalReducer";
import projectReducer from "./projectReducer";
import judgeReducer from "./judgeReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import actionResponseReducer from "./actionResponseReducer";

export default combineReducers({
    auth: authReducer,
    admin: adminReducer,
    final: finalReducer,
    project: projectReducer,
    judge: judgeReducer,
    errors: errorReducer,
    message: messageReducer,
    action: actionResponseReducer
});
