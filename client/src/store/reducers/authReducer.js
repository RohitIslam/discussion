// import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  users: {}
};

const authReducer = (currentState = initialState, action) => {
  switch (action.type) {
    default:
      return currentState;
  }
};

export default authReducer;
