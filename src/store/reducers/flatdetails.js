import * as actionTypes from "../actions/actionTypes";

const initialState = {
  flatdata: null,
  error: null
};

const flatDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_FLAT_DETAILS_SUBMIT:
      return {
        ...state,
        error: null,
        flatdata: null
      };
    case actionTypes.FLAT_DETAILS_SUBMIT_SUCCESS:
      return {
        ...state,
        error: null,
        flatdata: action.data
      };     
    case actionTypes.FLAT_DETAILS_SUBMIT_ERROR:
      return {
        ...state,
        flatdata: null,
        error: action.error
      };
    default:
      return state;
  }
};

export default flatDetailsReducer;
