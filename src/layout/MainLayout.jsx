import { Container, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "layout/Header";
import PropTypes from "prop-types";
import React from "react";
import DarkMode from "./Header/components/darkMode";
import Loading from "components/Loading";
import { useSelector } from "react-redux";
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
      <div style={{ paddingTop: "3rem" }}>
        <Container>{children}</Container>
      </div>
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default MainLayout;
