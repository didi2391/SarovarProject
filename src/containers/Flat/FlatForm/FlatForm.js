import React, { Component } from "react";

import { connect } from "react-redux";

import classes from "./FlatForm.module.css";
import Input from "../../../components/UI/Inputs/Input";
import Button from "../../../components/UI/Button/Button";
import * as actions from "../../../store/actions/index";

class FlatForm extends Component {
  onInputChangedHandler = (event, formElementId) => {
    event.persist();
    this.props.onFormInputChanged(event, formElementId);
  };

  render() {
    const formElementsArray = [];

    for (const key in this.props.flatForm) {
      formElementsArray.push({
        id: key,
        config: this.props.flatForm[key]
      });
    }
    let form = (
      <form onSubmit={this.props.flatSubmitBtnHandler}>
        {formElementsArray.map(formElement => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={event =>
                this.onInputChangedHandler(event, formElement.id)
              }
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button btnType="Success" disabled={this.props.formIsValid}>
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

const mapStateToProps = state => {
  return {
    flatForm: state.flat.flatForm,
    formIsValid: !state.flat.formIsValid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFormInputChanged: (event, inputIdentifier) =>
      dispatch(actions.formInputChangedHandler(event, inputIdentifier))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatForm);
