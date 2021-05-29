import { createMuiTheme } from "@material-ui/core";

const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    common: {
      black: "#4D5465",
      white: "#FFFFFF"
    },
    background: {
      default: "#FFFFFF",
      paper: "#F7F8FA",
      card: "#EBECF0",
      list: "#dfe3e6",
      modal: "#f4f5f7"
    },
    primary: {
      main: "#0348FF",
      light: "#1976d2",
      dark: "#303f9f",
      contrastText: "#FFF",
      menu: "#0348FF"
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
      hint: "rgba(0, 0, 0, 0.38)",
      light: "#8e8e8e"
    }
  },
  typography: {
    fontFamily: ["Montserrat", "'Kaushan Script'", "Arial", "sans-serif"].join(","),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  },
  breakpoints: {},
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
        },
        "@keyframes fadeIn": {
          "0%": {
            opacity: 0
          },
          "100%": {
            opacity: 1
          }
        },
        ".fade-in": {
          animation: "$fadeIn 1s ease-out"
        }
      }
    },
    MuiButton: {
      root: {
        fontSize: "12px"
      }
    }
  }
});

export default lightTheme;
