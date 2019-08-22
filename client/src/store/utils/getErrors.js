import * as actionTypes from "../actions/actionTypes";

const getErrors = error => {
  return { type: actionTypes.GET_ERRORS, payload: error };
};

export default getErrors;
