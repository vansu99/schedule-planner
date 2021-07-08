import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Paper, Typography, Divider, IconButton, Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#F4F5F7",
    width: "320px",
    float: "right",
    height: "100vh",
    right: theme.spacing(0),
    top: "5rem",
    borderRadius: theme.spacing(0),
    position: "fixed",
    wordWrap: "break-word",
    zIndex: "1200",
    transition: "right 0.7s ease-out"
  },
  card: {
    height: "90px",
    width: "45%",
    margin: theme.spacing(0.7),
    borderRadius: theme.spacing(1),
    "&:hover": {
      opacity: 0.7,
      cursor: "pointer"
    }
  },
  menuContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginTop: theme.spacing(2)
  },
  title: {
    padding: "9px",
    fontSize: "16px",
    position: "relative",
    "& > .MuiIconButton-root": {
      position: "absolute",
      right: 0,
      top: 0
    }
  }
}));

const colors = [
  "rgb(0, 121, 191)",
  "rgb(210, 144, 52)",
  "rgb(81, 152, 57)",
  "rgb(176, 70, 50)",
  "rgb(137, 96, 158)",
  "rgb(205, 90, 145)",
  "rgb(75, 191, 107)",
  "rgb(0, 174, 204)"
];

function Background({ closeHandler, setColorBackground, backHandler }) {
  const classes = useStyles();
  const [showColor, setShowColor] = useState(false);

  return (
    <Paper className={classes.container} variant="outlined" elevation={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <IconButton onClick={backHandler}>
          <ArrowBackIosIcon />
        </IconButton>
        <Typography variant="h5" component="h5" align="center" className={classes.title}>
          Background
        </Typography>
        <IconButton onClick={closeHandler}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider variant="middle" />
      <div className={classes.menuContainer}>
        <div
          className={classes.card}
          style={{
            backgroundImage: `url('https://a.trellocdn.com/prgb/dist/images/colors@2x.864f4df15d825e89e199.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
          onClick={() => {
            setShowColor(true);
          }}
        />
      </div>
      {showColor && (
        <div className={classes.menuContainer}>
          {colors.map(color => (
            <div
              className={classes.card}
              key={color}
              style={{ backgroundColor: color }}
              onClick={() => setColorBackground(color)}
            />
          ))}
        </div>
      )}
    </Paper>
  );
}

Background.propTypes = {
  closeHandler: PropTypes.func,
  backHandler: PropTypes.func
};

export default Background;
