import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./indexActions";

//Get current Profile
export const getProfile = data => {
  return {
    type: actionTypes.GET_PROFILE,
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
