import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./FlatDetails.module.css";

class FlatDetails extends Component {
  render() {
    return (      
      <div className={classes.FlatDetails}>
        <Button btnType="Success" clicked={this.props.fetchFlatDetailsData}>
          Click
        </Button>
      </div>
    );
  }
}

export default FlatDetails;
