import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const errorReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload;
    default:
      return currentState;
  }
};

export default errorReducer;
