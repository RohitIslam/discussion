import * as actionTypes from "./actionTypes";
import axios from "axios";
import jwt_decode from "jwt-decode";

import setAuthToken from "../utils/setAuthToken";

//Register user
export const getErrors = error => {
  return { type: actionTypes.GET_ERRORS, payload: error };
};

export const register = (userData, history) => {
  return dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => history.push("/login"))
      .catch(err => dispatch(getErrors(err.response.data)));
  };
};

//Login - get user token

export const setCurrentUser = decoded => {
  return { type: actionTypes.SET_CURRENT_USER, payload: decoded };
};

export const login = userData => {
  return dispatch => {
    axios
      .post("/api/users/login", userData)
      .then(res => {
        //Save token to localstorage
        const { token } = res.data;
        // Set token to localstorage
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        // Decode token to ger user data
        const decoded = jwt_decode(token);
        //Set current user
        dispatch(setCurrentUser(decoded));
      })
      .catch(err => dispatch(getErrors(err.response.data)));
  };
};
