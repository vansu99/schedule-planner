import React, { useEffect } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
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
import themes from "themes";
import { THEMES } from "configs/constants/app";

function App() {
  const isLoading = useSelector(state => state.app.loading);
  const { i18n } = useTranslation();
  const { language, modeTheme } = useGlobalContext();
  const type = modeTheme === THEMES.LIGHT ? 0 : 1;

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  return (
    <MuiThemeProvider theme={themes(type)}>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer />
      <Loading isLoading={isLoading} />
    </MuiThemeProvider>
  );
}

export default App;
