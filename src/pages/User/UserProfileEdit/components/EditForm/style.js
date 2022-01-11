import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  formEdit: {
    padding: '40px 60px',
  },
  userName: {
    fontSize: '2.4rem',
    fontFamily: "'Roboto', sans-serif",
  },
  btn: {
    fontSize: '1.4rem',
    textTransform: 'capitalize',
    marginTop: theme.spacing(1),
  },
  avatarSize: {
    width: '5rem',
    height: '5rem',
  },
}));

export default useStyles;
