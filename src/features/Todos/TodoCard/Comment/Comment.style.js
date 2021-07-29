import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  cmtWrapper: {
    marginBottom: '2rem',
  },
  cmtUserName: {
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
  },
  cmtContent: {
    display: 'flex',
    marginLeft: '4rem',
    background: theme.palette.background.list,
    marginTop: theme.spacing(0.8),
    borderBottomRightRadius: '1rem',
    overflow: 'hidden',
  },
  cmtDetail: {
    flex: 1,
    padding: '6px 10px 6px',
  },
  cmtText: {
    wordBreak: 'break-word',
    fontSize: '1.5rem',
    color: theme.palette.text.primary,
  },
  cmtTimetamps: {
    '& > *': {
      marginRight: '1rem',
      color: theme.palette.text.light,
    },
  },
  cmtActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '5rem',
  },
  cmtReply: {
    marginTop: '1rem',
    marginLeft: '4rem',
  },
}));

export default useStyles;
