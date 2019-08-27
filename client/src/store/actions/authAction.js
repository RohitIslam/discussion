import * as actionTypes from "./actionTypes";
import * as actions from "./indexActions";
import setAuthToken from "../utils/setAuthTokenUtil";
import axios from "axios";

//Load User
export const userLoaded = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data //Here payload is the user data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_ERROR
    });
  }
};

//Register user
export const registerSuccess = token => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload: token
  };
};

export const registerFail = () => {
  return {
    type: actionTypes.REGISTER_FAIL
  };
};

export const register = userData => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = JSON.stringify(userData);
    try {
      console.log("authAction: ", body);
      const res = await axios.post("/api/users/", body, config);
      console.log("authAction Res: ", res);
      dispatch(registerSuccess(res.data));
    } catch (err) {
      const errors = err.response.data.errors;
      console.log("authAction Errors: ", errors);
      if (errors) {
        errors.forEach(error =>
          dispatch(actions.setAlert(error.msg, "danger"))
        );
      }
      dispatch(registerFail());
    }
  };
};
