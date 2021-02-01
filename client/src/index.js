import React from "react";
import ReactDOM from "react-dom";
import AppProviders from "components/AppProviders";
import App from "./App";

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>, document.getElementById("root"));
