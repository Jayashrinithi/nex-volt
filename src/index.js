import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode basename="/nex-volt">
    <HashRouter>
  <App />
</HashRouter>
  </React.StrictMode>
);