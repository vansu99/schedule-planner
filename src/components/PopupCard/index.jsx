import React from "react";
import PropTypes from "prop-types";
import { Box, Divider, Typography } from "@material-ui/core";
import useStyles from "./theme.PopupCard";

function PopupCard({ children, notifyHeading }) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {notifyHeading && (
        <Typography variant="h6" component="h6">
          {notifyHeading}
        </Typography>
      )}
      <Divider />
      <Box component="ul" className={classes.ul}>
        {children}
      </Box>
    </Box>
  );
}

PopupCard.propTypes = {
  children: PropTypes.any,
  notifyHeading: PropTypes.string
};

export default PopupCard;
