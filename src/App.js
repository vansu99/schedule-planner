import DateFnsUtils from '@date-io/date-fns';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { fetchNotificationsStart } from 'actions/Global';
import { connectSocket } from 'actions/Socket';
import { StorageKeys } from 'configs';
import { THEMES } from 'configs/constants/app';
import { useGlobalContext } from 'contexts/global-context';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import themes from 'themes';
import history from './helpers/history';
import Routes from './routes/routes';
import { userActions } from './actions/User';

function App() {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const { language, modeTheme } = useGlobalContext();
  const type = modeTheme === THEMES.LIGHT ? 0 : 1;
  const token = localStorage.getItem(StorageKeys.TOKEN);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  useEffect(async () => {
    if (token) {
      await dispatch(userActions.asyncGetMe());
      dispatch(connectSocket());
      dispatch(fetchNotificationsStart());
    }
  }, [dispatch, token, fetchNotificationsStart, connectSocket]);

  return (
    <MuiThemeProvider theme={themes(type)}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router history={history}>
          <Routes />
        </Router>
        <ToastContainer />
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
}

export default App;
