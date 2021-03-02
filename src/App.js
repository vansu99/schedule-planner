import React from "react";
import { Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "./helpers/history";
import Routes from "./routes/routes";
import "./styles/index.scss";
import Loading from "components/Loading";

function App() {
  const isLoading = useSelector((state) => state.app.loading);
  return (
    <React.Fragment>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer />
      <Loading isLoading={isLoading} />
    </React.Fragment>
  );
}

export default App;
