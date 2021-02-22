import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { pathName, StorageKeys } from "../configs";

const AuthGuard = ({ children }) => {
  // check token cho các trang trong Dashboard
  const user = useSelector((state) => state.user.isAuthenticated);

  if (!user && !localStorage.getItem(StorageKeys.TOKEN)) return <Redirect to={pathName.LOGIN} />;

  return <>{children}</>;
};

export default AuthGuard;
