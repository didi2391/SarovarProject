import React, { Component } from "react";

import classes from "./FlatForm.module.css";
import Input from "../../../components/UI/Inputs/Input";
import Button from "../../../components/UI/Button/Button";

class FlatForm extends Component {
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
                this.props.inputChangedhandler(event, formElement.id)
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

export default FlatForm;
