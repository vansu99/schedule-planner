import { createMuiTheme } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    common: {
      black: "#4D5465",
      white: "#ffffff"
    },
    background: {
      default: "#121212",
      paper: "#424242"
    },
    primary: {
      light: "#333",
      main: "#90caf9",
      dark: "#303f9f",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "#90caf9",
      dark: "#c51162",
      contrastText: "#fff"
    },
    text: {
      primary: "#fff",
      secondary: "#fff",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)"
    }
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "antialiased",
          height: "100%"
        },
        body: {
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: "24px",
          height: "100%"
        }
      }
    }
  }
});

export default darkTheme;
