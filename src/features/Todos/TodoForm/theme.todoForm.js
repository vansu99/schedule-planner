import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: "21rem",
    marginBottom: "10px"
  },
  textarea: {
    outline: "none",
    border: "1px solid #eee",
    borderRadius: "4px",
    resize: "none",
    padding: "1rem"
  }
}));

export default useStyles;
