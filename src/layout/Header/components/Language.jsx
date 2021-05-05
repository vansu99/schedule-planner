import { Button, makeStyles } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TranslateIcon from "@material-ui/icons/Translate";
import { LANGUAGE } from "configs";
import { useGlobalContext } from "contexts/global-context";
import React, { useState } from "react";

const useStyles = makeStyles(theme => ({
  buttonLang: {
    color: "#FFF",
    fontSize: "14px"
  },
  menu: {
    "& .MuiMenuItem-root": {
      fontSize: "14px"
    }
  }
}));

export default function Language(props) {
  const classes = useStyles();
  const { setLanguage, language } = useGlobalContext();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const _handleChooseLanguage = lang => {
    setLanguage(lang);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button aria-controls="simple-menu" aria-haspopup="true" className={classes.buttonLang} onClick={handleClick}>
        <TranslateIcon />
        <span style={{ margin: "0 4px 0 8px" }}>{language}</span>
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
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
        <MenuItem onClick={() => _handleChooseLanguage(LANGUAGE.ENGLISH)}>ENGLISH</MenuItem>
        <MenuItem onClick={() => _handleChooseLanguage(LANGUAGE.VIETNAMESE)}>VIETNAMESE</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
