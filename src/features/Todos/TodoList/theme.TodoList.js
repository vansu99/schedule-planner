import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '28rem',
    backgroundColor: '#EBECF0',
    marginLeft: theme.spacing(2),
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
  },
  editTitleContainer: {
    padding: '0 0.8rem 1rem',
    display: 'flex',
    alignItems: 'center',
  },
  editTitle: {
    flexGrow: 1,
    fontWeight: 600,
    '& > h5': {
      fontSize: '1.5rem',
    },
  },
  input: {
    margin: '1rem 0.5rem',
    paddingLeft: '1rem',
    borderRadius: '4px',
    fontSize: '1.6rem',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 600,
    '&:focus': {
      background: '#FFF',
      width: '100%',
    },
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.list,
    maxWidth: '280px',
    minWidth: '280px',
    maxHeight: '80vh',
    height: '100%',
    padding: '1rem 0.2rem',
    marginRight: theme.spacing(1.2),
    overflow: 'auto',
  },
  todoListContent: {
    flex: '1 1 auto',
    marginBottom: 0,
    minHeight: '10px',
    overflowX: 'hidden',
    overflowY: 'auto',
    margin: '0 4px',
    padding: '0 4px',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#c9c3c3',
      borderRadius: '10px',
    },
  },
  icon: {
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
    outline: 'none',
    border: 0,
    '& .MuiSvgIcon-root': {
      fontSize: '1.9rem',
    },
  },
}));

export default useStyles;
