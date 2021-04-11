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
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "antialiased",
          height: "100%"
        },
        body: {
          fontSize: "62.5%",
          fontWeight: 400,
          lineHeight: "24px",
          height: "100%"
        }
      }
    }
  }
});

export default lightTheme;
