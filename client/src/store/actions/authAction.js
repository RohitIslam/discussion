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
      const res = await axios.post("/api/users/", body, config);

      dispatch(registerSuccess(res.data));

      dispatch(userLoaded());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          dispatch(actions.setAlert(error.msg, "danger"))
        );
      }

      dispatch(registerFail());
    }
  };
};

//Login user

export const loginSuccess = token => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload: token
  };
};

export const loginFail = () => {
  return {
    type: actionTypes.LOGIN_FAIL
  };
};

export const login = userData => {
  return async dispatch => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify(userData);

    try {
      const res = await axios.post("/api/auth", body, config);

      dispatch(loginSuccess(res.data));

      dispatch(userLoaded());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach(error =>
          dispatch(actions.setAlert(error.msg, "danger"))
        );
      }

      dispatch(loginFail());
    }
  };
};

//Logout and clear profile

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE
  };
};

export const logout = () => dispatch => {
  dispatch(clearProfile());
  dispatch({ type: actionTypes.LOGOUT });
};
