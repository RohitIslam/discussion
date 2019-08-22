import * as actionTypes from "../actions/actionTypes";
import isEmptyValidation from "../../Validation/isEmptyValidation";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const authReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...currentState,
        isAuthenticated: !isEmptyValidation(action.payload),
        user: action.payload
      };
    default:
      return currentState;
  }
};

export default authReducer;
