import { userActions } from 'actions/User';
import clsx from 'clsx';
import useStyles from './LoginForm/theme.loginForm';
import { pathName } from 'configs';
import { appConstants } from 'configs/constants/app';
import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';

function Login(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector(state => state.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated === true) {
      setIsAuthenticated(true);
    }
  }, [user]);

  useEffect(() => {
    if (location.pathname) {
      window.localStorage.setItem(appConstants.MODE_THEME, 'light');
    }
  }, [location.pathname]);

  const handleSubmit = values => {
    dispatch(userActions.asyncLogin(values));
  };

  if (isAuthenticated) {
    return <Redirect to={pathName.TODO_LIST} />;
  } else {
    return (
      <div className={clsx(classes.loginWrapper, 'fade-in')}>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    );
  }
}

export default memo(Login);
