import axios from "../../axios-config";

import * as actionTypes from "./actionTypes";

export const toggleFormBtnClickAction = () => {
  return {
    type: actionTypes.TOGGLE_FORM_CLICK_ACTION
  };
};

export const formInputChangedHandler = (event, inputIdentifier) => {
  return {
    type: actionTypes.FORM_INPUT_CHANGED,
    event: event,
    inputIdentifier: inputIdentifier
  };
};

export const fetchFlatDetails = data => {
  return {
    type: actionTypes.FETCH_FLAT_DETAILS,
    data: data
  };
};

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
        console.log(flatDetailsData);
        dispatch(flatDetailsSubmitSuccess(flatDetailsData));
      })
      .catch(error => dispatch(flatDetailsSubmitError(error)));
  };
};

export const fetchFlatDetailsAPICall = () => {
  return dispatch => {
    axios
      .get("flats.json")
      .then(response => {
        if (response !== null && response.data !== null) {
          dispatch(fetchFlatDetails(response.data));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
};
