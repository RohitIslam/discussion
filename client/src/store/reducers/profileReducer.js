import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: null,
  loading: false
};

const profileReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_LOADING:
      return {
        ...currentState,
        loading: true
      };
    case actionTypes.GET_PROFILE:
      return {
        ...currentState,
        profile: action.payload,
        loading: false
      };
    case actionTypes.CLEAR_CURRENT_PROFILE:
      return {
        ...currentState,
        profile: null
      };
    default:
      return currentState;
  }
};

export default profileReducer;