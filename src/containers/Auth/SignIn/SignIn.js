import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { connect } from "react-redux";
import GoogleButton from "react-google-button";

import { withFirebase } from "../../../helper/firebase/index";
import * as ROUTES from "../../../constants/routes";
import * as actions from "../../../store/actions/index";
import * as classes from "./SignIn.module.css";

class SignInPage extends React.Component {
  render() {
    return (
      <div>
        <SignInGoogle />
      </div>
    );
  }
}

class SignInGoogleBase extends Component {
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: []
          })
          .then(() => {
            this.props.onAuthSuccess(
              socialAuthUser.credential.idToken,
              socialAuthUser.user.uid
            );
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.SignIn}>
        <GoogleButton type="light" onClick={this.onSubmit}>
          Sign In with Google
        </GoogleButton>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthSuccess: (token, userId) =>
      dispatch(actions.authSuccess(token, userId))
    // onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
  };
};

const SignInGoogle = connect(
  mapStateToProps,
  mapDispatchToProps
)(
  compose(
    withRouter,
    withFirebase
  )(SignInGoogleBase)
);

export default SignInPage;

export { SignInGoogle };
