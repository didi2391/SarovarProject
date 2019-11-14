import React, { Component } from "react";
import { connect } from "react-redux";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import * as actions from "../../../store/actions/index";

class FlatDetails extends Component {
  componentDidMount() {
    this.props.onFetchFlatDetails();
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: "200px",
          margin: "20px auto",
          boxshadow: "0 2px 3px #ccc",
          border: "1px solid #eee",
          padding: "10px",
          boxsizing: "border-box"
        }}
      >
        <AgGridReact
          columnDefs={this.props.columnData}
          rowData={this.props.rowData}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    columnData: state.flat.columnData,
    rowData: state.flat.rowData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchFlatDetails: () => dispatch(actions.fetchFlatDetailsAPICall())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FlatDetails);
