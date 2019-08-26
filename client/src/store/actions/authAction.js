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
