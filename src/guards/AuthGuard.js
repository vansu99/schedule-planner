import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { pathName } from "../configs";

const AuthGuard = ({ children }) => {
  // check token cho các trang trong Dashboard
  const user = useSelector((state) => state.user.isAuthenticated);

  if (!user && !localStorage.getItem("access_Token")) return <Redirect to={pathName.LOGIN} />;

  return <>{children}</>;
};

export default AuthGuard;
