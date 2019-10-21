import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import SignIn from "./containers/Auth/SignIn/SignIn";
import Landing from "./containers/Landing/Landing";

import * as ROUTES from "./constants/routes";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.SIGN_IN} exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
