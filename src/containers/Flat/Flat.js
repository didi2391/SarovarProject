import React, { Component } from "react";
import { connect } from "react-redux";

import FlatForm from "./FlatForm/FlatForm";
import FlatDetails from "./FlatDetails/FlatDetails";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";

class Flat extends Component {
  state = {
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
    toggleFlatFormDisplay: false
  };

  checkValidity = (value, rules) => {
    let isValid = false;

    if (!rules) return true;

    if (rules.required) {
      isValid = value.trim() !== "";
    }

    if (rules.maxlength) {
      return value.length === rules.maxlength;
    }

    return isValid;
  };

  inputChangedhandler = (event, inputIdentifier) => {
    const updatedOrderFlatForm = { ...this.state.flatForm };
    const updatedFormElement = { ...updatedOrderFlatForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderFlatForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderFlatForm) {
      formIsValid = updatedOrderFlatForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({
      flatForm: updatedOrderFlatForm,
      formIsValid: formIsValid
    });
  };

  flatHandler = event => {
    event.preventDefault();

    const formData = {};

    for (const formatElementIdentifier in this.state.flatForm) {
      formData[formatElementIdentifier] = this.state.flatForm[
        formatElementIdentifier
      ].value;
    }

    this.props.onFlatDetaisSubmit(formData);
  };

  toggleFlatFormDisplay = () => {
    this.setState({ toggleFlatFormDisplay: !this.state.toggleFlatFormDisplay });
  };

  render() {
    let addFlatForm = null;
    if (this.state.toggleFlatFormDisplay) {
      addFlatForm = (
        <FlatForm
          flatForm={this.state.flatForm}
          formIsValid={!this.state.formIsValid}
          inputChangedhandler={this.inputChangedhandler}
          flatSubmitBtnHandler={this.flatHandler}
        />
      );
    }
    return (
      <div>
        <Button btnType="Success" clicked={this.toggleFlatFormDisplay}>
          Add Flat Details
        </Button>
        {addFlatForm}
        <FlatDetails
          columnDefs={this.state.columnDefs}
          rowDefs={this.state.flatDetailsData}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFlatDetaisSubmit: flatDetailsData =>
      dispatch(actions.submitFlatDetailsData(flatDetailsData))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Flat);
