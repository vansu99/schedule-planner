import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    minHeight: "calc(100vh - 50px)",
    overflowY: "auto",
    paddingTop: theme.spacing(5)
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
  }
}));

export default useStyles;
