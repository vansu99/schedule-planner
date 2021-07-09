import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formEdit: {
    padding: '40px 60px',
  },
  userName: {
    fontFamily: "'Poppins', sans-serif",
  },
  btn: {
    fontSize: '1.4rem',
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
  },
  avatarSize: {
    width: '8rem',
    height: '8rem',
  },
}));

export default useStyles;
