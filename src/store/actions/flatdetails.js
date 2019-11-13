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
    console.log("Submit dispatched");
    axios
      .post("/flats.json", flatDetailsData)
      .then(response => {
        if (response.data.status === 200)
          dispatch(flatDetailsSubmitSuccess(response.data));
      })
      .catch(error => dispatch(flatDetailsSubmitError(error)));
  };
};
