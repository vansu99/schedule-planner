import { createMuiTheme } from '@material-ui/core';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    common: {
      black: '#4D5465',
      white: '#FFFFFF',
    },
    background: {
      default: '#262c49',
      paper: '#262c49',
      paperDark: 'rgb(16, 22, 58)',
      card: '#262c49',
      list: 'rgb(16, 22, 58)',
      modal: 'rgb(16, 22, 58)',
      hover: 'rgb(16, 22, 58)',
      scroll: 'rgb(115, 103, 240)',
    },
    primary: {
      main: 'rgb(115, 103, 240)',
      dark: '#121212',
      contrastText: '#FFFFFF',
      menu: 'rgb(16, 22, 58)',
    },
    secondary: {
      light: '#ff4081',
      main: '#90caf9',
      dark: '#c51162',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#c2c6dc',
      secondary: '#000000',
      disabled: 'rgba(255, 255, 255, 0.5)',
      hint: 'rgba(255, 255, 255, 0.5)',
      border: '#414561',
    },
    error: {
      main: '#e94848',
    },
  },
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
  },
});

export default darkTheme;
