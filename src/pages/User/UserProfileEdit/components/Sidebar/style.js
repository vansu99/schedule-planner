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
    fontSize: "16px"
  },
  linkActive: {
    fontWeight: "bold",
    borderLeft: "4px solid #262626"
  }
}));

export default useStyles;
