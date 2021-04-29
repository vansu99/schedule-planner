import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  loader: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    zIndex: 11,
    overflow: "hidden",
    "& > svg": {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }
}));

export default function Loading({ isLoading }) {
  const classes = useStyles();

  return isLoading ? (
    <div className={classes.loader}>
      <svg width="100px" height="100px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path
          fill="none"
          stroke="#07abcc"
          strokeWidth="8"
          strokeDasharray="42.76482137044271 42.76482137044271"
          d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
          strokeLinecap="round"
        >
          <animate
            attributeName="stroke-dashoffset"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0;256.58892822265625"
          ></animate>
        </path>
      </svg>
    </div>
  ) : null;
}
