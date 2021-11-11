import React from 'react';
import { useSelector } from 'react-redux';
import history from 'helpers/history';

const GuestGuard = ({ children }) => {
  const user = useSelector(state => state.user.currentUser);
  const isLoggedIn = user._id;

  if (isLoggedIn) history.push(`/users/${user._id}`)
  return <>{children}</>;
};

export default GuestGuard;
