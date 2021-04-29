import { Container, makeStyles } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Loading from "components/Loading";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";

GuestLayout.propTypes = {
  children: PropTypes.any
};

GuestLayout.defaultProps = {
  children: null
};

const useStyles = makeStyles(theme => ({
  app: {
    position: "relative",
    minHeight: "100vh",
    paddingTop: "60px"
  }
}));

function GuestLayout({ children }) {
  const classes = useStyles();
  const isLoading = useSelector(state => state.app.loading);

  return (
    <div className={classes.app}>
      <CssBaseline />
      <Container>{children}</Container>
      <Loading isLoading={isLoading} />
    </div>
  );
}

export default GuestLayout;
