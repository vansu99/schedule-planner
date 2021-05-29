import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textField: {
    width: "100%",
    "& input": {
      color: theme.palette.text.primary,
      "&::placeholder": {
        color: theme.palette.text.primary,
        fontWeight: 500,
        textTransform: "capitalize"
      }
    }
  }
}));

export default useStyles;
