import * as actionTypes from "../actions/actionTypes";
const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

const postReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST:
      return {
        ...currentState,
        posts: [action.payload, ...currentState.posts],
        loading: false
      };
    case actionTypes.GET_POST:
      return {
        ...currentState,
        post: action.payload,
        loading: false
      };
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
    case actionTypes.UPDATE_LIKES:
      return {
        ...currentState,
        posts: currentState.posts.map(post =>
          post._id === action.payload.postId
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false
      };
    case actionTypes.DELETE_POST:
      return {
        ...currentState,
        posts: currentState.posts.filter(post => post._id !== action.payload),
        loading: false
      };
    case actionTypes.ADD_COMMENT:
      return {
        ...currentState,
        post: { ...currentState.post, comments: action.payload },
        loading: false
      };
    case actionTypes.REMOVE_COMMENT:
      return {
        ...currentState,
        post: {
          ...currentState.post,
          comments: currentState.post.comments.filter(
            comment => comment._id !== action.payload
          )
        },
        loading: false
      };
    default:
      return currentState;
  }
};

export default postReducer;
