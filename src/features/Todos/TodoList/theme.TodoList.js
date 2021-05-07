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
    padding: "0 0 10px 0",
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
  },
  todoList: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "5px",
    backgroundColor: theme.palette.background.list,
    maxWidth: "300px",
    minWidth: "300px",
    maxHeight: "100%",
    padding: "10px 8px 0 8px",
    marginRight: theme.spacing(1)
  },
  todoListContent: {
    flex: "1 1 auto",
    marginBottom: 0,
    minHeight: "10px",
    overflowX: "hidden",
    overflowY: "auto"
  },
  icon: {
    color: theme.palette.text.primary,
    backgroundColor: "transparent",
    outline: "none",
    border: 0,
    "& .MuiSvgIcon-root": {
      fontSize: "1.9rem"
    }
  }
}));

export default useStyles;
