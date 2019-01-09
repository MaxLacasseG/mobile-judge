import { CLEAR_ERRORS } from "./types";

export const ClearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
};
