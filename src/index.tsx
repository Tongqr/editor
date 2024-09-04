import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./input.css";
const root = ReactDOM.createRoot(document.getElementById("app")!);
// v18 的新方法
root.render(
  <Router>
    <App />
  </Router>
);
