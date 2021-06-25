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
    padding: "0 1.5rem 10px",
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
    maxHeight: "76vh",
    height: "100%",
    padding: "10px 0 0",
    marginRight: theme.spacing(1),
    overflow: "auto"
  },
  todoListContent: {
    flex: "1 1 auto",
    marginBottom: 0,
    minHeight: "10px",
    overflowX: "hidden",
    overflowY: "auto",
    padding: "0 4px",
    margin: "0 4px",
    "&::-webkit-scrollbar": {
      width: "7px"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#c9c3c3",
      borderRadius: "10px"
    }
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
