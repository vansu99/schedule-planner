import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    height: 46
  },
  title: {
    flexGrow: 1
  },
  link: {
    fontFamily: "'Kaushan Script', cursive",
    color: "#fff",
    textDecoration: "none"
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  menuSelect: {
    "& .MuiMenuItem-root": {
      fontWeight: 400
    }
  }
}));

export default useStyles;
