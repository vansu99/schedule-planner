import { Avatar, Divider } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import NotificationButton from 'components/Notification/NotificationButton';
import SearchBoard from 'components/SearchBoard';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions/User';
import Logo from 'assets/images/logo.png';
import useStyles from './theme.header';

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
      <AppBar position="static" className={classes.header}>
        <Toolbar style={{ minHeight: '100%' }}>
          <div className={classes.headerLogo}>
            <Link to="/" className={classes.link}>
              <img src={Logo} alt="" />
              <Typography variant="h4" className={classes.title}>
                Schedule Planner
              </Typography>
            </Link>
          </div>
          <SearchBoard />
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon fontSize="large" />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div> */}
          <div className={classes.headerRight}>
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
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  getContentAnchorEl={null}
                >
                  <MenuItem>
                    Signed in as <span style={{ marginLeft: '5px', fontWeight: 500 }}>{loggedInUser.username}</span>
                  </MenuItem>
                  <Divider />
                  <MenuItem>Helps</MenuItem>
                  <MenuItem>Settings</MenuItem>
                  <MenuItem>Your profile</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleLogout}>{translate('logout')}</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
