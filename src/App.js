import React, { useEffect } from "react";
import { Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import history from "./helpers/history";
import Routes from "./routes/routes";
import "./styles/index.scss";
import Loading from "./components/Loading";
import { useTranslation } from "react-i18next";
import { useGlobalContext } from "contexts/global-context";

function App() {
  const isLoading = useSelector(state => state.app.loading);
  const { i18n } = useTranslation();
  const { language } = useGlobalContext();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

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
