import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import SignIn from "./containers/Auth/SignIn/SignIn";
import User from "./containers/User/User";
import SignOut from "./containers/Auth/Signout/Signout";

import * as ROUTES from "./constants/routes";
import { connect } from "react-redux";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path={ROUTES.SIGN_IN} component={SignIn} />
        <Route path={ROUTES.USER} component={User} />
        <Redirect to={ROUTES.SIGN_IN} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path={ROUTES.SIGN_OUT} component={SignOut} />
          <Route path={ROUTES.USER} component={User} />
          <Redirect to={ROUTES.USER} />
        </Switch>
      );
    }

    return <Layout>{routes}</Layout>;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
