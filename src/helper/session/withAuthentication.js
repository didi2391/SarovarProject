import React from "react";

import AuthUserContext from "./context";
import { withFirebase } from "../firebase";

const withAuthentication = Component => {
  return withFirebase(
    class WithAuthentication extends React.Component {

      state = {
        authUser: JSON.parse(localStorage.getItem("authUser"))
      };

      componentDidMount() {
        this.listener = this.props.firebase.onAuthUserListener(
          authUser => {
            localStorage.setItem("authUser", JSON.stringify(authUser));
            this.setState({ authUser });
          },
          () => {
            localStorage.removeItem("authUser");
            this.setState({ authUser: null });
          }
        );
      }

      componentWillUnmount() {
        this.listener();
      }

      render() {
        return (
          <AuthUserContext.Provider value={this.state.authUser}>
            <Component {...this.props} />
          </AuthUserContext.Provider>
        );
      }
    }
  );
};

export default withAuthentication;
