import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column"
    }
  },
  footerLeft: {
    "& > .MuiTypography-root": {
      marginRight: theme.spacing(2),
      textTransform: "uppercase",
      color: "#333333"
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing(2)
    }
  },
  footerRight: {
    marginLeft: "auto",
    "& > .MuiTypography-root": {
      textTransform: "uppercase",
      color: "#333333",
      "& > span": {
        color: "#f44336",
        fontWeight: "bold"
      }
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0
    }
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <div className={classes.footer}>
        <div className={classes.footerLeft}>
          <Typography variant="h6" component={Link} to="/">
            about
          </Typography>
          <Typography variant="h6" component={Link} to="/">
            help
          </Typography>
          <Typography variant="h6" component={Link} to="/">
            contact
          </Typography>
          <Typography variant="h6" component={Link} to="/">
            terms
          </Typography>
        </div>
        <div className={classes.footerRight}>
          <Typography variant="h6" component="h6">
            Made by <span>evandev</span>
          </Typography>
        </div>
      </div>
    </Container>
  );
}
