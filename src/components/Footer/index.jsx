import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(5)
  },
  footerLeft: {
    "& > .MuiTypography-root": {
      marginRight: theme.spacing(2),
      textTransform: "uppercase",
      color: "#333333"
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
    }
  }
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={7} className={classes.footerLeft}>
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
        </Grid>
        <Grid item xs={5} className={classes.footerRight}>
          <Typography variant="h6" component="h6">
            Made by <span>evandev</span>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
