import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%",
    "& .MuiFormLabel-root": {
      textTransform: "capitalize"
    }
  }
}));

export default useStyles;
