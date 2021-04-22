import { MuiThemeProvider } from "@material-ui/core/styles";
import { THEMES } from "configs/constants/app";
import { useGlobalContext } from "contexts/global-context";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import themes from "themes";
import Loading from "./components/Loading";
import history from "./helpers/history";
import Routes from "./routes/routes";
import SocketClient from "services/Socket/socketClient";
import { connectSocket } from "actions/Socket";
import { StorageKeys } from "configs";
import { fetchNotificationsStart } from "actions/Global";
import "./styles/index.scss";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.loading);
  const { i18n } = useTranslation();
  const { language, modeTheme } = useGlobalContext();
  const type = modeTheme === THEMES.LIGHT ? 0 : 1;
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
      <Loading isLoading={isLoading} />
    </MuiThemeProvider>
  );
}

export default App;
