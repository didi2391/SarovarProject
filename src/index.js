import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import App from "./App";
import Firebase, { FirebaseContext } from "./helper/firebase";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FirebaseContext.Provider>,
  rootElement
);
