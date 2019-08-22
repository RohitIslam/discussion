import * as actionTypes from "./actionTypes";
import axios from "axios";

export const profileLoading = () => {
  return {
    type: actionTypes.PROFILE_LOADING
  };
};

export const clearCurrentProfile = () => {
  return {
    type: actionTypes.CLEAR_CURRENT_PROFILE
  };
};

export const getProfile = data => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: data
  };
};

//Get current profile
export const getCurrentProfile = () => {
  return dispatch => {
    dispatch(profileLoading());
    axios
      .get("/api/profile")
      .then(res => dispatch(getProfile(res.data)))
      .catch(err => dispatch(getProfile({})));
  };
};
