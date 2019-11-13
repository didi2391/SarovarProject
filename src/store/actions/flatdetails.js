import axios from "../../axios-config";

import * as actionTypes from "./actionTypes";

export const flatDetailsStartSubmit = () => {
  return {
    type: actionTypes.START_FLAT_DETAILS_SUBMIT
  };
};

export const flatDetailsSubmitSuccess = flatDetailsData => {
  return {
    type: actionTypes.FLAT_DETAILS_SUBMIT_SUCCESS,
    data: flatDetailsData
  };
};

export const flatDetailsSubmitError = error => {
  return {
    type: actionTypes.FLAT_DETAILS_SUBMIT_ERROR,
    error: error
  };
};

export const submitFlatDetailsData = flatDetailsData => {
  return dispatch => {
    dispatch(flatDetailsStartSubmit());
    axios
      .post("/flats.json", flatDetailsData)
      .then(response => {
        dispatch(flatDetailsSubmitSuccess(flatDetailsData));
      })
      .catch(error => dispatch(flatDetailsSubmitError(error)));
  };
};
