import { createMuiTheme } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
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

export default darkTheme;
