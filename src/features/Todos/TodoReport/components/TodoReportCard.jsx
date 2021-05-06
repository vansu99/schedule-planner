import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import React, { memo } from "react";

const useStyles = makeStyles(theme => ({
  todoReportCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem 1rem",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    position: "relative",
    transition: "all .25s",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#FFFCF2",
      color: "#32373B"
    }
  },
  todoCardPercent: {
    marginLeft: "0.7rem",
    fontSize: "1.5rem",
    fontWeight: "400"
  },
  cardContent: {
    "&:first-of-child": {
      backgroundColor: "blue"
    }
  }
}));

function TodoReportCard({ title, completed, calPercent = 0, color }) {
  const classes = useStyles();

  return (
    <Card className={classes.todoReportCard} style={{ borderBottom: `7px solid ${color}` }}>
      <Typography variant="h4" component="h4">
        {title}
      </Typography>
      <Typography variant="h4" component="h5">
        {completed}
        <Typography variant="subtitle2" component="span" className={classes.todoCardPercent}>
          ({isNaN(calPercent) ? 0 : calPercent}%)
        </Typography>
      </Typography>
    </Card>
  );
}

TodoReportCard.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.number,
  calPercent: PropTypes.string,
  color: PropTypes.string
};

export default memo(TodoReportCard);
