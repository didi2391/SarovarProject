import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Button from "../../components/UI/Button/Button";
import AddDetails from "./AddDetails/AddFlat";
import ViewDetails from "./ViewDetails/ViewFlat";
import * as ROUTES from "../../constants/routes";

class Flat extends Component {
  addClick = () => {
    this.props.history.push(ROUTES.ADDFLAT);
  };

  viewClick = () => {
    this.props.history.push(ROUTES.VIEWFLAT);
  };

  render() {
    return (
      <div>
        <Button btnType="Success" clicked={this.addClick}>
          Add Details
        </Button>
        <Button btnType="Success" clicked={this.viewClick}>
          View Details
        </Button>
        <Route
          path={this.props.match.path + "/addflat"}
          component={AddDetails}
        />
        <Route
          path={this.props.match.path + "/viewflat"}
          component={ViewDetails}
        />
      </div>
    );
  }
}

export default Flat;
