import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";
import useStyles from "./theme.PopupCard";

function PopupCard({ children }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box component="ul" className={classes.ul}>
        {children}
      </Box>
    </Box>
  );
}

PopupCard.propTypes = {
  children: PropTypes.any
};

export default PopupCard;
