import * as actionTypes from "./actionTypes";
import getErrors from "../utils/getErrors";
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

//Create profile
export const createProfile = (profileData, history) => {
  return dispatch => {
    axios
      .post("/api/profile", profileData)
      .then(res => history.push("/dashboard"))
      .catch(err => dispatch(getErrors(err.response.data)));
  };
};

//Delete account

export const setCurrentUser = decoded => {
  return { type: actionTypes.SET_CURRENT_USER, payload: decoded };
};

export const deleteAccount = () => {
  return dispatch => {
    if (window.confirm("Are you sure? This can not be undone!")) {
      axios
        .delete("/api/profile")
        .then(res => setCurrentUser({}))
        .catch(err => dispatch(getErrors(err.response.data)));
    }
  };
};
