import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minWidth: '21rem',
    marginBottom: '10px',
    color: theme.palette.text.primary,
  },
  textarea: {
    outline: 'none',
    border: '1px solid #eee',
    fontFamily: '"Roboto", sans-serif',
    wordBreak: 'break-word',
    fontSize: '1.5rem',
    borderRadius: '4px',
    resize: 'none',
    lineHeight: 1.6,
    padding: '1rem',
  },
  btn: {
    padding: '0 10px',
    fontSize: '1.2rem',
    lineHeight: 2,
    height: '3rem',
    textTransform: 'capitalize',
  },
}));

export default useStyles;
