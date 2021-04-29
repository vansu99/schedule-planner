import React from "react";
import PropTypes from "prop-types";
import Alert from "@material-ui/lab/Alert";

function AlertCpt({ children, severity = "success" }) {
  return (
    <Alert variant="filled" severity={severity}>
      {children}
    </Alert>
  );
}

AlertCpt.propTypes = {
  children: PropTypes.any,
  severity: PropTypes.string
};

export default AlertCpt;
