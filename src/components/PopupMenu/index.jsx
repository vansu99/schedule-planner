import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Menu, Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  popupMenu: (props) => ({
    '& .MuiMenu-paper': {
      //top: '102px !important',
      //left: '98rem !important',
      width: '100%',
      maxWidth: props.width,
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.text.border}`,
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
    },
  }),
}));

const PopupMenu = ({ id, width, showPopup, closePopup, children }) => {
  const classes = useStyles({ width });
  return (
    <Menu
      keepMounted
      id={id}
      className={classes.popupMenu}
      anchorEl={showPopup}
      open={Boolean(showPopup)}
      onClose={closePopup}
      TransitionComponent={Fade}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </Menu>
  );
};

export default PopupMenu;
