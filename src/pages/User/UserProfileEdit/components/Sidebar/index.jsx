import React from "react";
import { NavLink } from "react-router-dom";
import { pathName } from "configs";
import { useTranslation } from "react-i18next";
import useStyles from "./style";

const SidebarUserEdit = props => {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  return (
    <div className={classes.sidebar}>
      <NavLink to={pathName.USER_EDIT} className={classes.link} activeClassName={classes.linkActive}>
        <span>{translate("info_personal")}</span>
      </NavLink>
      <NavLink to={pathName.USER_CHANGE_PASSWORD} className={classes.link} activeClassName={classes.linkActive}>
        <span>{translate("change_pw")}</span>
      </NavLink>
    </div>
  );
};

export default SidebarUserEdit;
