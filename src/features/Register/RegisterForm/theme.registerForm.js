import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '1000px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    minHeight: '100vh',
    overflow: 'hidden',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      padding: '1rem 3rem',
      alignItems: 'normal',
    },
  },
  title: {
    fontFamily: "'Kaushan Script', cursive",
    textAlign: 'center',
    marginTop: '2rem',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
    },
  },
  loginLeft: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  loginRight: {
    [theme.breakpoints.down('sm')]: {
      paddingTop: theme.spacing(5),
    },
  },
  loginForm: {
    width: '100%',
    maxWidth: '35rem',
    padding: '1rem 4rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    border: '1px solid #dbdbdb',
    borderRadius: '0.6rem',
    backgroundColor: '#FFFFFF',
    '& .login-brand': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& > img': {
        width: '4rem',
        height: '4rem',
        objectFit: 'cover',
        marginRight: '1rem',
      },
    },
    [theme.breakpoints.down('sm')]: {
      border: 0,
      padding: 0,
      '& > form': {
        marginTop: theme.spacing(3),
      },
    },
  },
  btnLogin: {
    marginTop: theme.spacing(1),
    fontSize: '1.3rem',
    backgroundColor: '#0095f6',
    '&:hover': {
      backgroundColor: '#0095f6d6',
    },
  },
  orLogin: {
    position: 'relative',
    marginTop: '1.6rem',
    marginBottom: '1.8rem',
    textAlign: 'center',
    '&:after': {
      position: 'absolute',
      content: '',
      height: '1px',
      width: '100%',
      left: 0,
      top: '50%',
      backgroundColor: '#dbdbdb',
    },
    '& > span': {
      textTransform: 'uppercase',
      backgroundColor: '#FFFFFF',
      color: theme.palette.text.primary,
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '0.5rem 0.9rem',
    },
  },
  socialLogin: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1.2rem',
    borderRadius: '.6rem',
    border: '1px solid #dbdbdb',
    color: '#385185',
    fontWeight: '600',
    padding: '1rem 0',
    cursor: 'pointer',
    '& > img': {
      width: '25px',
      height: '25px',
      objectFit: 'cover',
    },
    '& > span': {
      marginLeft: '1rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
      '& > i': {
        top: '5px',
        fontSize: '2.6rem',
      },
    },
  },
  loginGoogle: {
    boxShadow: 'none !important',
    color: '#385185 !important',
    fontSize: '1.7rem !important',
  },
  term: {
    color: theme.palette.text.light,
    textAlign: 'center',
    fontFamily: '"Roboto", sans-serif',
    marginTop: theme.spacing(2.6),
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  otherRegister: {
    border: '1px solid #dbdbdb',
    backgroundColor: theme.palette.background.default,
    marginTop: theme.spacing(1.5),
    padding: '2rem 0',
    display: 'flex',
    borderRadius: '.6rem',
    justifyContent: 'center',
    alignItems: 'center',
    '& > p > a': {
      color: theme.palette.primary.main,
      marginLeft: '.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      '& > .MuiTypography-h6': {
        fontSize: '1.7rem',
      },
    },
  },
}));

export default useStyles;
