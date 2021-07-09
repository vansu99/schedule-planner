import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '100%',
    left: '80%',
    zIndex: 9,
    transform: 'translateX(-80%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    width: '30rem',
    maxHeight: '30rem',
    padding: '2rem',
    textAlign: 'center',
    color: '#000000',
    filter: 'drop-shadow(0 0 3px #dbdbdb)',
    // "&::before": {
    //   position: "absolute",
    //   content: "''",
    //   width: "2.5rem",
    //   height: "1rem",
    //   backgroundColor: "#FFF",
    //   bottom: "100%",
    //   left: "80%",
    //   transform: "translateX(-100%)",
    //   clipPath: "polygon(50% 0,100% 100%,0 100%)",
    //   boxShadow: "0 0 30px 0 #999"
    // },
    '& > .MuiSvgIcon-root': {
      fontSize: '5rem',
      marginBottom: theme.spacing(2),
    },
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  notifyItem: {
    width: '100%',
    minHeight: '7rem',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
  },
  notifyItemContent: {
    '& > .MuiTypography-root': {
      lineHeight: 1.2,
    },
  },
}));

export default useStyles;
