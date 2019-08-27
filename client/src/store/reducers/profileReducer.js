import * as actionTypes from "../actions/actionTypes";
const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

const profileReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return {
        ...currentState,
        profile: action.payload,
        loading: false
      };
    case actionTypes.PROFILE_ERROR:
      return {
        ...currentState,
        error: action.payload,
        loading: false
      };
    case actionTypes.CLEAR_PROFILE:
      return {
        ...currentState,
        profile: null,
        repos: [],
        loading: false
      };
    default:
      return currentState;
  }
};

export default profileReducer;
