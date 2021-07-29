import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '123rem',
    padding: '3rem 1.5rem 0 1.5rem',
    margin: '0 auto',
  },
  todoReportList: {
    flexGrow: 1,
    marginBottom: '3rem',
  },
  todoReportTitle: {
    paddingTop: '5px',
    paddingBottom: '5px',
    paddingLeft: '1rem',
    borderLeft: `5px solid ${theme.palette.primary.light}`,
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
