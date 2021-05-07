import { MuiThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { fetchNotificationsStart } from "actions/Global";
import { connectSocket } from "actions/Socket";
import { StorageKeys } from "configs";
import { THEMES } from "configs/constants/app";
import { useGlobalContext } from "contexts/global-context";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import themes from "themes";
import history from "./helpers/history";
import Routes from "./routes/routes";
import "./styles/index.scss";

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language } = useGlobalContext();
  const type = JSON.parse(localStorage.getItem(StorageKeys.DARK_MODE)) === THEMES.LIGHT ? 0 : 1;
  const token = localStorage.getItem(StorageKeys.TOKEN);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(() => {
    if (token) {
      dispatch(connectSocket());
      dispatch(fetchNotificationsStart());
    }
  }, [dispatch, token, fetchNotificationsStart, connectSocket]);

  return (
    <MuiThemeProvider theme={themes(type)}>
      <Router history={history}>
        <Routes />
      </Router>
      <ToastContainer />
    </MuiThemeProvider>
  );
}

export default App;
