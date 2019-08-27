import * as actionTypes from "../actions/actionTypes";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null
};

const authReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...currentState,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case actionTypes.REGISTER_FAIL:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case actionTypes.USER_LOADED:
      return {
        ...currentState,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case actionTypes.AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...currentState,
        ...action.payload,
        isAuthenticated: true,
        loading: false
      };
    case actionTypes.LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...currentState,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    default:
      return currentState;
  }
};

export default authReducer;
