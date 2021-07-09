import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  modal: {
    width: '100%',
    maxWidth: '95rem',
    //min-height: 62.5rem,
    maxHeight: 'calc(100vh - 2rem)',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.modal,
    padding: '2rem 1.5rem',
    border: 0,
    outline: 'none',
    borderRadius: '6px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '6px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#eee',
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
    },
  },
  overlay: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 99,
  },
}));

export default useStyles;
