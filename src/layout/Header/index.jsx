import { Divider } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationButton from "components/Notification/NotificationButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userActions } from "../../actions/User";
import "./header.scss";
import useStyles from "./theme.header";

export default function Header({ children }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t: translate } = useTranslation();
  const [isShow, setIsShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedInUser = useSelector(state => state.user.currentUser);
  const isLoggedIn = !!loggedInUser._id; // có id là loggedIn

  const handleShowDrawler = () => {
    setIsShow(!isShow);
  };

  const handleLogout = () => {
    dispatch(userActions.actLogout());
  };

  const handleUserClick = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            <Link to="/" className={classes.link}>
              Scheduler
            </Link>
          </Typography>
          {/* {!isLoggedIn && (
            <Link to={pathName.LOGIN} className="nav__login">
              {translate("login")}
            </Link>
          )} */}
          {isLoggedIn && (
            <>
              <NotificationButton />
              <IconButton color="inherit" aria-controls="menu-appbar" onClick={handleUserClick}>
                <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                id="menu-appbar"
                keepMounted
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                getContentAnchorEl={null}
              >
                <MenuItem>Thông tin</MenuItem>
                <Divider variant="middle" />
                <MenuItem onClick={handleLogout}>{translate("logout")}</MenuItem>
              </Menu>
            </>
          )}
          {children}
        </Toolbar>
      </AppBar>
    </div>
  );
}
