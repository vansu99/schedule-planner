import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "30rem",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(2),
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem"
  },
  editTitleContainer: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center"
  },
  editTitle: {
    flexGrow: 1,
    fontSize: "1.6rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600
  },
  input: {
    margin: "1rem 0.5rem",
    paddingLeft: "1rem",
    borderRadius: "4px",
    fontSize: "1.6rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    "&:focus": {
      background: "#FFF",
      width: "100%"
    }
  }
}));

export default useStyles;
