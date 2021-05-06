import { createMuiTheme } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    common: {
      black: "#4D5465",
      white: "#ffffff"
    },
    background: {
      default: "#ffffff",
      paper: "#F7F8FA"
    },
    primary: {
      main: "#3A61C8",
      light: "#1976d2",
      dark: "#303f9f",
      contrastText: "#FFF"
    },
    secondary: {
      main: "#6294E7",
      contrastText: "#FFF"
    },
    error: {
      main: "#e94848"
    },
    text: {
      primary: "#4D5465",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "'Kaushan Script'", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
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

export default lightTheme;
