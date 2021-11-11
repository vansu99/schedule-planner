import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '1200px',
    padding: '30px 15px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '23px',
    marginBottom: '25px'
  },
  helpWrapper: {},
  helpTitle: {
    fontSize: '19px',
    marginBottom: '15px'
  },
  helpTable: {
    width: '700px',
    '& thead': {
      backgroundColor: theme.palette.background.list,
      '& th': {
        border: `1px solid ${theme.palette.text.primary}`
      }
    },
    '& th': {
      color: theme.palette.text.primary,
      padding: '15px',
      textAlign: 'center',
      border: `1px solid ${theme.palette.text.primary}`,
      fontSize: '16px'
    },
    '& td': {
      padding: '15px',
      border: `1px solid ${theme.palette.text.primary}`,
      '& p:not(:last-child)': {
        marginBottom: '5px'
      }
    }
  }
}));

export default useStyles;
