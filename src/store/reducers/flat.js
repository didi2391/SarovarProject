import * as actionTypes from "../actions/actionTypes";

const initialState = {
  flatForm: {
    flatNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Flat Number"
      },
      value: "",
      validation: {
        required: true,
        maxlength: 3
      },
      valid: false,
      touched: false
    },
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Full Name"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    phoneNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Phone Number"
      },
      value: "",
      validation: {
        required: true,
        maxlength: 10
      },
      valid: false,
      touched: false
    },
    alternateNumber: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Alternate Phone Number"
      },
      value: "",
      validation: {
        required: true,
        maxlength: 10
      },
      valid: false,
      touched: false
    },
    flatType: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "Rented", displayValue: "Rented" },
          { value: "Owner", displayValue: "Owner" }
        ]
      },
      value: "Owner",
      valid: true,
      validation: {
        required: true
      }
    },
    vehicleNumber1: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Vehicle Number 1"
      },
      value: "",
      validation: {
        required: true
      },
      valid: false,
      touched: false
    },
    vehicleNumber2: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Vehicle Number 2"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false
    },
    vehicleNumber3: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Vehicle Number 3"
      },
      value: "",
      validation: {
        required: false
      },
      valid: true,
      touched: false
    }
  },
  formIsValid: false,
  toggleFlatFormDisplay: false,
  error: null,
  columnData: [
    { headerName: "Flat Number", field: "flatNumber" },
    { headerName: "Flat Type", field: "flatType" },
    { headerName: "Full Name", field: "name" },
    { headerName: "Phone Number", field: "phoneNumber" },
    { headerName: "Alternate Phone Number", field: "alternateNumber" },
    { headerName: "Vehicle Number - 1", field: "vehicleNumber1" },
    { headerName: "Vehicle Number - 2", field: "vehicleNumber2" },
    { headerName: "Vehicle Number - 3", field: "vehicleNumber3" }
  ],
  rowData: []
};

const flatDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_FORM_CLICK_ACTION:
      return {
        ...state,
        toggleFlatFormDisplay: !state.toggleFlatFormDisplay
      };
    case actionTypes.FORM_INPUT_CHANGED: {
      const updatedFlatForm = { ...state.flatForm };
      const updatedFormElement = {
        ...updatedFlatForm[action.inputIdentifier]
      };
      updatedFormElement.value = action.event.target.value;
      // updatedFormElement.valid = this.checkValidity(
      //   updatedFormElement.value,
      //   updatedFormElement.validation
      // );
      updatedFormElement.valid = true;
      updatedFormElement.touched = true;
      updatedFlatForm[action.inputIdentifier] = updatedFormElement;

      let formIsValid = true;
      for (const inputIdentifier in updatedFlatForm) {
        formIsValid = updatedFlatForm[inputIdentifier].valid && formIsValid;
      }
      return {
        ...state,
        flatForm: updatedFlatForm,
        formIsValid: formIsValid
      };
    }
    case actionTypes.FETCH_FLAT_DETAILS:
      return {
        ...state,
        rowData: Object.values(action.data)
      };
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
        flatdata: [...this.state.flatdata, Object.assign({}, action.data)]
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
