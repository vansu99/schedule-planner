import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    flexShrink: 0,
    textTransform: "uppercase",
    marginLeft: theme.spacing(1)
  },
  icon: {
    height: "100%",
    lineHeight: "2.1rem"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

function AccordionCpt({ children, title, icon }) {
  const classes = useStyles();
  const { t: translate } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === title} onChange={handleChange(title)} square>
        <AccordionSummary aria-controls={`${title}-content`} id={`${title}-header`}>
          <i className={`${icon} ${classes.icon}`}></i>
          <Typography variant="h6" component="h5" className={classes.heading}>
            {translate(title)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}

AccordionCpt.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  icon: PropTypes.string
};

export default AccordionCpt;
