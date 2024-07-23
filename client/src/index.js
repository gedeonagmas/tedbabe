import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./features/api/apiSlice.js";
import App from "app.js";

ReactDOM.render(
  <BrowserRouter>
    <ApiProvider api={apiSlice}>
      <App />
    </ApiProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
