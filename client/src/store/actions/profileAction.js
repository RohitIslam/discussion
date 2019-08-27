import * as actionTypes from "./actionTypes";
import axios from "axios";
// import * as actions from "./indexActions";

//Get current Profile
export const getProfile = data => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: data
  };
};

export const profileError = (errorMsg, errorStatus) => {
  return {
    type: actionTypes.PROFILE_ERROR,
    payload: { msg: errorMsg, status: errorStatus }
  };
};

export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      // dispatch(profileLoading());
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  };
};
