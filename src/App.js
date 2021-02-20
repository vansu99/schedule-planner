import React from "react";
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import history from "./helpers/history";
import Routes from "./routes/routes";

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
