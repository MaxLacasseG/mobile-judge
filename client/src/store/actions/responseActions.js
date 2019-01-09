import { CLEAR_ACTION_RESPONSE } from "./types";

export const ClearResponse = () => dispatch => {
    dispatch({ type: CLEAR_ACTION_RESPONSE });
};
