import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
