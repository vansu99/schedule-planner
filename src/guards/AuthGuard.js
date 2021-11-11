import React from 'react';
import { useSelector } from 'react-redux';
import { pathName, StorageKeys } from '../configs';
import history from 'helpers/history';
import { Redirect } from 'react-router-dom'

const AuthGuard = ({ children }) => {
  // check token cho các trang trong Dashboard
  const user = useSelector(state => state.user.currentUser);
  const isLoggedIn = user._id;

  // false -> redirect login
  if (!isLoggedIn && !localStorage.getItem(StorageKeys.TOKEN)) return <Redirect to={pathName.LOGIN} />

  return <>{children}</>;
};

export default AuthGuard;
