import * as actionTypes from "../actions/actionTypes";
const initialState = [];

const alertReducer = (currentState = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return [...currentState, action.payload];
    case actionTypes.REMOVE_ALERT:
      return currentState.filter(alert => alert.id !== action.payload);
    default:
      return currentState;
  }
};

export default alertReducer;
