import { Divider, Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
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
  const [anchorEl, setAnchorEl] = useState(null);
  const loggedInUser = useSelector(state => state.user.currentUser);
  const isLoggedIn = !!loggedInUser._id; // có id là loggedIn

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
      <AppBar position="static" color="primary" className={classes.header}>
        <Toolbar style={{ minHeight: "100%" }}>
          <Typography variant="h4" className={classes.title}>
            <Link to="/" className={classes.link}>
              Scheduler
            </Link>
          </Typography>
          {/* {!isLoggedIn && (
            <Link to={pathName.LOGIN} className="nav__login">
              {translate("login")}
            </Link>
          )} */}
          <NotificationButton />
          {children}
          <Divider orientation="vertical" variant="middle" />
          {isLoggedIn && (
            <>
              <IconButton color="inherit" aria-controls="menu-appbar" onClick={handleUserClick}>
                <Avatar src={loggedInUser.image} className={classes.small} />
                <KeyboardArrowDownIcon />
              </IconButton>
              <Menu
                className={classes.menuSelect}
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
                <MenuItem>
                  Signed in as <span style={{ marginLeft: "5px", fontWeight: 500 }}>{loggedInUser.username}</span>
                </MenuItem>
                <Divider />
                <MenuItem>Helps</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Your profile</MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>{translate("logout")}</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
