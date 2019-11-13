import React, { Component } from "react";

import FlatForm from "./FlatForm/FlatForm";
import FlatDetails from "./FlatDetails/FlatDetails";

class Flat extends Component {
  render() {
    return (
      <div>
        <FlatForm />
        <FlatDetails />
      </div>
    );
  }
}

export default Flat;
