import axios from "axios";

//Function that receives a token
//Sets authorization headers with token
//if false, removes token from auth header
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export default setAuthToken;
