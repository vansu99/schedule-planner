import { makeStyles, fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  header: {
    height: 50,
    backgroundColor: theme.palette.primary.menu,
  },
  title: {
    marginLeft: theme.spacing(1.2),
  },
  headerLogo: {
    width: '24rem',
    '& img': {
      width: '3rem',
      height: '3rem',
      objectFit: 'cover',
    },
  },
  headerRight: {
    flex: 1,
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
    },
  },
  link: {
    fontFamily: "'Kaushan Script', cursive",
    color: '#FFFFFF',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    marginRight: theme.spacing(1),
  },
  menuSelect: {
    '& .MuiMenuItem-root': {
      fontWeight: 400,
    },
  },
}));

export default useStyles;
