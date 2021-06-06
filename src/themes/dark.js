import { createMuiTheme } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    common: {
      black: "#4D5465",
      white: "#FFFFFF"
    },
    background: {
      default: "#212121",
      paper: "#424242",
      card: "rgba(84, 84, 89, 0.91)",
      list: "rgb(24, 24, 32)",
      modal: "#212121"
    },
    primary: {
      main: "#0348FF",
      dark: "#121212",
      contrastText: "#FFFFFF",
      menu: "#404040"
    },
    secondary: {
      light: "#ff4081",
      main: "#90caf9",
      dark: "#c51162",
      contrastText: "#FFFFFF"
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#000000",
      disabled: "rgba(255, 255, 255, 0.5)",
      hint: "rgba(255, 255, 255, 0.5)"
    },
    error: {
      main: "#e94848"
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
