import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "935px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-around",
    [theme.breakpoints.down("sm")]: {
      marginTop: 0
    }
  },
  title: {
    fontFamily: "'Kaushan Script', cursive",
    textAlign: "center",
    marginTop: "2rem",
    marginBottom: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "39px"
    }
  },
  loginLeft: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  loginRight: {
    [theme.breakpoints.down("sm")]: {
      padding: "0 1rem"
    }
  },
  loginForm: {
    width: "100%",
    maxWidth: "35rem",
    padding: "1rem 4rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 0,
    border: "1px solid #dbdbdb",
    borderRadius: "1px",
    backgroundColor: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      border: 0,
      padding: 0
    }
  },
  btnLogin: {
    marginTop: theme.spacing(1),
    fontSize: "1.3rem",
    backgroundColor: "#0095f6",
    "&:hover": {
      backgroundColor: "#0095f6d6"
    }
  },
  orLogin: {
    position: "relative",
    marginTop: "1.6rem",
    marginBottom: "1.8rem",
    textAlign: "center",
    "&:after": {
      position: "absolute",
      content: "",
      height: "1px",
      width: "100%",
      left: 0,
      top: "50%",
      backgroundColor: "#dbdbdb"
    },
    "& > span": {
      textTransform: "uppercase",
      backgroundColor: "#FFFFFF",
      color: theme.palette.text.primary,
      fontSize: "1.2rem",
      fontWeight: "bold",
      padding: "0.5rem 0.9rem"
    }
  },
  socialLogin: {
    marginBottom: theme.spacing(1),
    display: "block",
    textAlign: "center",
    color: "#385185",
    fontWeight: "600",
    "& > i": {
      display: "inline-block",
      marginRight: "0.7rem",
      position: "relative",
      top: "5px",
      fontSize: "2.3rem"
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.8rem",
      "& > i": {
        top: "5px",
        fontSize: "2.6rem"
      }
    }
  },
  forgotLogin: {
    color: theme.palette.primary.main,
    fontSize: "1.2rem",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    marginTop: "1.4rem",
    [theme.breakpoints.down("sm")]: {
      marginTop: "2.5rem",
      fontSize: "1.5rem"
    }
  },
  otherRegister: {
    border: "1px solid #dbdbdb",
    borderRadius: "1px",
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1.5),
    padding: "2rem 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& > p > a": {
      color: theme.palette.primary.main,
      marginLeft: ".5rem"
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      "& > .MuiTypography-h6": {
        fontSize: "1.7rem"
      }
    }
  }
}));

export default useStyles;
