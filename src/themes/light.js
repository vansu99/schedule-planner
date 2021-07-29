import { createMuiTheme } from '@material-ui/core';

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    common: {
      black: '#4D5465',
      white: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFF',
      paperDark: '#FFF',
      card: '#F7F8FA',
      list: '#dfe3e6',
      modal: '#f4f5f7',
      hover: '#efecec',
      scroll: '#4D5465',
    },
    primary: {
      main: '#0348FF',
      light: '#1976d2',
      dark: 'rgb(40 75 247)',
      contrastText: '#FFF',
      menu: '#0348FF',
    },
    secondary: {
      main: '#6294E7',
      contrastText: '#FFF',
    },
    error: {
      main: '#e94848',
    },
    text: {
      primary: '#4D5465',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
      light: '#c2c6dc',
      border: '#dadada',
    },
  },
  typography: {
    fontFamily: ['Montserrat', "'Kaushan Script'", 'Arial', 'sans-serif'].join(','),
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
  breakpoints: {},
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontSize: '14px',
          fontFamily: "'Roboto', sans-serif",
          fontWeight: 400,
          lineHeight: '24px',
          height: '100%',
          overflowX: 'hidden',
        },
        '@keyframes fadeIn': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        '.fade-in': {
          animation: '$fadeIn 1s ease-out',
        },
      },
    },
    MuiButton: {
      root: {
        fontSize: '12px',
        '&:hover': {
          opacity: 0.95,
          //backgroundColor: `#1976d2!important`
        },
      },
    },
  },
});

export default lightTheme;
