import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import axios from "../../../axios-config";

class FlatDetails extends Component {
  state = {
    columnDefs: [
      { headerName: "Flat Number", field: "flatNumber" },
      { headerName: "Flat Type", field: "flatType" },
      { headerName: "Full Name", field: "name" },
      { headerName: "Phone Number", field: "phoneNumber" }
    ],
    rowData: []
  };

  componentDidMount() {
    axios
      .get("flats.json")
      .then(response => {
        if (response !== null && response.data !== null) {
          this.setState({ rowData: Object.values(response.data) });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "200px",
          width: "810px",
          margin: "20px auto",
          boxshadow: "0 2px 3px #ccc",
          border: "1px solid #eee",
          padding: "10px",
          boxsizing: "border-box"
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
        />
      </div>
    );
  }
}

export default FlatDetails;
