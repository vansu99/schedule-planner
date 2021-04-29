import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  header: {
    height: 45
  },
  title: {
    flexGrow: 1
  },
  link: {
    fontFamily: "'Kaushan Script', cursive",
    color: "#fff",
    textDecoration: "none"
  }
}));

export default useStyles;
