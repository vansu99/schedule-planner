import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '40px 60px',
  },
  btn: {
    fontSize: '1.3rem',
    textTransform: 'capitalize',
    marginTop: theme.spacing(1.7),
  },
}));

export default useStyles;
