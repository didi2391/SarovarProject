import React, { Component } from "react";
import { connect } from "react-redux";

import FlatForm from "./FlatForm/FlatForm";
import FlatDetails from "./FlatDetails/FlatDetails";
import * as actions from "../../store/actions/index";
import axios from "../../axios-config";

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
      flatType: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "rented", displayValue: "Rented" },
            { value: "owner", displayValue: "Owner" }
          ]
        },
        value: "owner",
        valid: true,
        validation: {
          required: true
        }
      }
    },
    formIsValid: false
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

  fetchFlatDetailsData = () => {
    axios
      .get("https://srinidhisarovar.firebaseio.com//flats.json")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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

    const flatDetailsData = {
      flatData: formData
    };

    this.props.onFlatDetaisSubmit(flatDetailsData);
  };

  render() {
    return (
      <div>
        <FlatForm
          flatForm={this.state.flatForm}
          formIsValid={!this.state.formIsValid}
          inputChangedhandler={this.inputChangedhandler}
          flatSubmitBtnHandler={this.flatHandler}
        />
        <FlatDetails fetchFlatDetailsData={this.fetchFlatDetailsData} />
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
