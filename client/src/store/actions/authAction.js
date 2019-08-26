import * as actionTypes from "./actionTypes";
import * as actions from "./indexActions";
import axios from "axios";

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
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(userData);
    try {
      const res = await axios.post("/api/users/", body, config);
      dispatch(registerSuccess(res));
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.foreach(error =>
          dispatch(actions.setAlert(error.msg, "danger"))
        );
      }
      dispatch(registerFail());
    }
  };
};
