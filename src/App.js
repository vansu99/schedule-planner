import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "./helpers/history";
import Routes from "./routes/routes";
import "./styles/index.scss";

function App() {
  return (
    <React.Fragment>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
