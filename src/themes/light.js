import { createMuiTheme } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    common: {
      black: "#333333",
      white: "#ffffff"
    },
    background: {
      default: "#121212",
      paper: "#424242"
    },
    primary: {},
    secondary: {},
    text: {}
  },
  overrides: {}
});

export default lightTheme;
