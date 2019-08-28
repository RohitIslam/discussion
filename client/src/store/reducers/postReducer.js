import * as actionTypes from "../actions/actionTypes";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return {
        ...currentState,
        posts: action.payload,
        loading: false
      };
    case actionTypes.POST_ERROR:
      return {
        ...currentState,
        error: action.payload,
        loading: false
      };
    default:
      return currentState;
  }
};

export default postReducer;
