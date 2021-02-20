import { pathName } from "../configs";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const user = useSelector((state) => state.user.isAuthenticated);
  //console.log("test auth ", user);

  if (user) return <Redirect to={pathName.ROOT} />;
  return <>{children}</>;
};

export default GuestGuard;
