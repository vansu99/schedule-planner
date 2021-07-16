import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    minHeight: 'calc(100vh - 50px)',
    overflowY: 'auto',
    backgroundColor: theme.palette.background.default,
  },
  main: {
    padding: '0 10px',
  },
  titleIcon: {
    display: 'flex',
    alignItems: 'center',
    '& .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
    color: theme.palette.text.primary,
  },
  btn: {
    width: '120px',
    height: '32px',
    lineHeight: '32px',
    fontWeight: 500,
    fontSize: '1.2rem',
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    fontFamily: 'Poppins, sans-serif',
    textTransform: 'capitalize',
    border: '0',
    padding: 0,
  },
  todosWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    height: '100%',
  },
  todoInfoTopLeft: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  todoTopOwner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '3rem',
    '& > img': {
      width: '3.5rem',
      height: '3.5rem',
      objectFit: 'cover',
      borderRadius: '3.5rem',
    },
  },
  todoTopOwnerInfo: {
    marginLeft: '0.8rem',
    lineHeight: 1.4,
    '& > p': {
      fontWeight: '600',
      fontSize: '1.4rem',
      fontFamily: 'Roboto, sans-serif',
    },
    '& > span': {
      fontWeight: 400,
      fontSize: '1.3rem',
      fontFamily: 'Roboto, sans-serif',
      color: '#6f7782',
    },
  },
  todoInfoTopRight: {},
}));

export default useStyles;
