import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";

import { withFirebase } from "../../../helper/firebase/index";
import * as ROUTES from "../../../constants/routes";
import * as actions from "../../../store/actions/index";

class SignOutButton extends Component {
  componentDidMount() {
    this.props.firebase.doSignOut();
    this.props.onLogout();
  }

  render() {
    return <Redirect to={ROUTES.SIGN_IN} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logoutSucceed())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withFirebase(SignOutButton));
