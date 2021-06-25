import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    backgroundColor: theme.palette.background.default
  },
  main: {
    padding: "0 10px"
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
    width: "120px",
    height: "32px",
    lineHeight: "32px",
    fontWeight: 500,
    fontSize: "1.2rem",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    textTransform: "capitalize",
    border: "0",
    padding: 0
  }
}));

export default useStyles;
