import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 46px)",
    overflowY: "auto",
    paddingTop: theme.spacing(5)
  },
  main: {
    padding: "0 16px"
  }
}));

export default useStyles;
