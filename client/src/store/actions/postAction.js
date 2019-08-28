import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./indexActions";

export const getPosts = data => {
  return {
    type: actionTypes.GET_POSTS,
    payload: data
  };
};

export const postError = (errorMsg, errorStatus) => {
  return {
    type: actionTypes.POST_ERROR,
    payload: { msg: errorMsg, status: errorStatus }
  };
};

//Get All Posts
export const getAllPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch(getPosts(res.data));
  } catch (err) {
    dispatch(postError(err.response.statusText, err.response.status));
  }
};
