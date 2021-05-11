import React from "react";
import { NavLink } from "react-router-dom";
import { pathName } from "configs";
import useStyles from "./style";

const SidebarUserEdit = props => {
  const classes = useStyles();
  return (
    <div className={classes.sidebar}>
      <NavLink to={pathName.USER_EDIT} className={classes.link} activeClassName={classes.linkActive}>
        <span>Edit Profile</span>
      </NavLink>
      <NavLink to={pathName.USER_CHANGE_PASSWORD} className={classes.link} activeClassName={classes.linkActive}>
        <span>Change Password</span>
      </NavLink>
    </div>
  );
};

export default SidebarUserEdit;
