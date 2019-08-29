import * as actionTypes from "./actionTypes";
import axios from "axios";
import * as actions from "./indexActions";

export const getPosts = data => {
  return {
    type: actionTypes.GET_POSTS,
    payload: data
  };
};

export const updateLike = (postId, data) => {
  return {
    type: actionTypes.UPDATE_LIKES,
    payload: {
      postId,
      likes: data
    }
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

//Add like
export const addLike = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${post_id}`);
    dispatch(updateLike(post_id, res.data));
  } catch (err) {
    dispatch(postError(err.response.statusText, err.response.status));
  }
};

//Remove like
export const removeLike = post_id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${post_id}`);
    dispatch(updateLike(post_id, res.data));
  } catch (err) {
    dispatch(postError(err.response.statusText, err.response.status));
  }
};

//Delete post
export const deletePost = post_id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${post_id}`);

    dispatch({
      type: actionTypes.DELETE_POST,
      payload: post_id
    });

    dispatch(actions.setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch(postError(err.response.statusText, err.response.status));
  }
};

//Add post
export const addPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/posts/", formData, config);

    dispatch({
      type: actionTypes.ADD_POST,
      payload: res.data
    });

    dispatch(actions.setAlert("Post Created", "success"));
  } catch (err) {
    dispatch(postError(err.response.statusText, err.response.status));
  }
};