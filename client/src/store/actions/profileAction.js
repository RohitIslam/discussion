import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./indexActions";

export const getProfiles = data => {
  return {
    type: actionTypes.GET_PROFILES,
    payload: data
  };
};

export const getProfile = data => {
  return {
    type: actionTypes.GET_PROFILE,
    payload: data
  };
};

export const getGitRepos = data => {
  return {
    type: actionTypes.GET_GIT_REPOS,
    payload: data
  };
};

export const updateProfile = data => {
  return {
    type: actionTypes.UPDATE_PROFILE,
    payload: data
  };
};

export const profileError = (errorMsg, errorStatus) => {
  return {
    type: actionTypes.PROFILE_ERROR,
    payload: { msg: errorMsg, status: errorStatus }
  };
};

export const clearProfile = () => {
  return {
    type: actionTypes.CLEAR_PROFILE
  };
};
export const deleteAccount = () => {
  return {
    type: actionTypes.DELETE_ACCOUNT
  };
};

//Get current Profile

export const getCurrentProfile = () => {
  return async dispatch => {
    try {
      const res = await axios.get("/api/profile/me");
      dispatch(getProfile(res.data));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  };
};

// Get all profiles

export const getAllProfiles = () => {
  return async dispatch => {
    dispatch(clearProfile());
    try {
      const res = await axios.get("/api/profile");
      dispatch(getProfiles(res.data));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  };
};

// Get profile by user id

export const getProfileByUserId = user_id => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/profile/user/${user_id}`);
      dispatch(getProfile(res.data));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  };
};

// Get GitHub Repos

export const getGithubRepos = username => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/profile/github/${username}`);
      dispatch(getGitRepos(res.data));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  };
};

//Create or Update profile

export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch(getProfile(res.data));

    dispatch(
      actions.setAlert(edit ? "Profile Updated" : "Profile Created", "success")
    );

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, "danger")));
    }
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

//Add experience

export const addExperience = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch(updateProfile(res.data));

    dispatch(actions.setAlert("Experience Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, "danger")));
    }
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

//Add education

export const addEducation = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch(updateProfile(res.data));

    dispatch(actions.setAlert("Education Added", "success"));

    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(actions.setAlert(error.msg, "danger")));
    }
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

// Delete experience

export const deleteExperience = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(actions.setAlert("Experience Deleted", "success"));
  } catch (err) {
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

// Delete education

export const deleteEducation = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch(updateProfile(res.data));

    dispatch(actions.setAlert("Education Deleted", "success"));
  } catch (err) {
    dispatch(profileError(err.response.statusText, err.response.status));
  }
};

// Delete Account and Profile

export const deleteAccountAndProfile = () => async dispatch => {
  if (window.confirm("Are you sure? This can NOT be undone")) {
    try {
      const res = await axios.delete("/api/profile/");

      dispatch(clearProfile());
      dispatch(deleteAccount());

      dispatch(actions.setAlert("Account Deleted Permanently", "success"));
    } catch (err) {
      dispatch(profileError(err.response.statusText, err.response.status));
    }
  }
};
