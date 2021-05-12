import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    paddingTop: theme.spacing(5),
    backgroundColor: theme.palette.background.default
  },
  main: {
    padding: "0 16px"
  },
  titleIcon: {
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1)
    },
    color: theme.palette.text.primary
  },
  btn: {
    padding: "6px 8px",
    fontWeight: 500,
    fontSize: "1.2rem",
    backgroundColor: "hsla(0, 0%, 0%, 0.08)"
  }
}));

export default useStyles;
