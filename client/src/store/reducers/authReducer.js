import * as actionTypes from "../actions/actionTypes";
import isEmptyValidation from "../../Validation/isEmptyValidation";

const initialState = {
  isAuthenticated: false,
  users: {}
};

const authReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...currentState,
        isAuthenticated: !isEmptyValidation(action.payload),
        users: action.payload
      };
    default:
      return currentState;
  }
};

export default authReducer;
