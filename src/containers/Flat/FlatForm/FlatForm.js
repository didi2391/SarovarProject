import React, { Component } from "react";
import { connect } from "react-redux";

import classes from "./FlatForm.module.css";
import Input from "../../../components/UI/Inputs/Input";
import Button from "../../../components/UI/Button/Button";
import * as actions from "../../../store/actions/index";

class FlatForm extends Component {
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
        value: "fastest",
        valid: false,
        validation: {
          required: true
        }
      }
      // email: {
      //   elementType: "input",
      //   elementConfig: {
      //     type: "text",
      //     placeholder: "Your Email"
      //   },
      //   value: "",
      //   validation: {
      //     required: true
      //   },
      //   valid: false,
      //   touched: false
      // }
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
    this.setState({ flatForm: updatedOrderFlatForm, formIsValid: formIsValid });
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
    const formElementsArray = [];

    for (const key in this.state.flatForm) {
      formElementsArray.push({
        id: key,
        config: this.state.flatForm[key]
      });
    }

    let form = (
      <form onSubmit={this.flatHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event => this.inputChangedhandler(event, formElement.id)}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          SUBMIT
        </Button>
      </form>
    );

    return (
      <div className={classes.FlatForm}>
        <h4>Enter Details below</h4>
        {form}
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
)(FlatForm);