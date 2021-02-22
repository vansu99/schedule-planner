import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30rem",
    backgroundColor: "#EBECF0",
    marginLeft: theme.spacing(2),
  },
  editTitleContainer: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  editTitle: {
    flexGrow: 1,
    fontSize: "1.6rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
  },
  input: {
    margin: theme.spacing(1),
    paddingLeft: "1rem",
    borderRadius: "4px",
    fontSize: "1.6rem",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    "&:focus": {
      background: "#FFF",
      width: "100%",
    },
  },
}));

export default useStyles;
