import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  sidebar: {
    borderRight: "1px solid #dbdbdb",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  link: {
    padding: theme.spacing(2),
    display: "block",
    color: theme.palette.text.primary,
    fontSize: "14px",
    fontFamily: "'Poppins', sans-serif"
  },
  linkActive: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
    borderLeft: `4px solid ${theme.palette.primary.main}`
  }
}));

export default useStyles;
