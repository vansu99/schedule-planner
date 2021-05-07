import { makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "components/Loading";
import Header from "layout/Header";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import DarkMode from "./Header/components/darkMode";
import Language from "./Header/components/Language";

MainLayout.propTypes = {
  children: PropTypes.any
};

MainLayout.defaultProps = {
  children: null
};

const useStyles = makeStyles(theme => ({
  app: {
    position: "relative",
    minHeight: "100vh"
  }
}));

function MainLayout({ children }) {
  //const themeSwitcher = useDarkMode();
  const classes = useStyles();
  const isLoading = useSelector(state => state.app.loading);

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Header>
        <DarkMode />
        <Language />
      </Header>
      {children}
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default MainLayout;
