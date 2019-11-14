import React, { Component } from "react";
import { connect } from "react-redux";

import FlatForm from "./FlatForm/FlatForm";
import FlatDetails from "./FlatDetails/FlatDetails";
import * as actions from "../../store/actions/index";
import Button from "../../components/UI/Button/Button";

class Flat extends Component {
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

  flatHandler = event => {
    event.preventDefault();

    const formData = {};

    for (const formatElementIdentifier in this.props.flatForm) {
      formData[formatElementIdentifier] = this.props.flatForm[
        formatElementIdentifier
      ].value;
    }
    this.props.onFlatDetaisSubmit(formData);
  };

  toggleFlatFormDisplay = () => {
    this.props.onAddFormButtonClick();
  };

  render() {
    let addFlatForm = null;
    if (this.props.toggleFlatFormDisplay) {
      addFlatForm = (
        <FlatForm
          // flatForm={this.props.flatForm}
          // formIsValid={!this.props.formIsValid}
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
          columnDefs={this.props.columnData}
          rowDefs={this.props.rowData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    toggleFlatFormDisplay: state.flat.toggleFlatFormDisplay,
    columnData: state.flat.columnData,
    rowData: state.flat.rowData,
    flatForm: state.flat.flatForm,
    formIsValid: state.flat.formIsValid
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFlatDetaisSubmit: flatDetailsData =>
      dispatch(actions.submitFlatDetailsData(flatDetailsData)),
    onAddFormButtonClick: () => dispatch(actions.toggleFormBtnClickAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Flat);
