import * as actionTypes from "./actionTypes";
import axios from "axios";

//Register user

export const getErrors = error => {
  return { type: actionTypes.GET_ERRORS, payload: error };
};

export const register = userData => {
  return dispatch => {
    axios
      .post("/api/users/register", userData)
      .then(res => console.log(res.data))
      .catch(err => dispatch(getErrors(err.response.data)));
  };
};
