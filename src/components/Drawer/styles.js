import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: `280px`,
    flexShrink: 0,
  },
  drawerPaper: {
    width: `280px`,
    paddingBottom: 50,
    backgroundColor: theme.palette.background.paper,
    top: '7%',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    fontSize: 20,
    position: 'relative',
    '& > .MuiIconButton-root': {
      position: 'absolute',
      top: '22%',
      right: 0,
    },
  },
  item: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
  },
  itemLeaf: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
  },
  buttonLeaf: {
    display: 'flex',
    color: theme.palette.text.secondary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '&.depth-0': {
      '& $title': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    '&:hover': {
      textDecoration: 'none',
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '20px',
  },
  title: {
    padding: '9px',
    fontSize: '16px',
    position: 'relative',
    '& > .MuiIconButton-root': {
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  active: {
    color: theme.palette.secondary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.secondary.main,
    },
  },
  navBar_link: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textDecoration: 'none',
    textTransform: 'capitalize',
    userSelect: 'none',
  },
  activityWrapper: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '1.8rem',
    '& > svg': {
      fontSize: '1.8rem',
      marginRight: '0.7rem',
    },
  },
  titleActivity: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1.5),
    '& > .MuiSvgIcon-root': {
      marginRight: theme.spacing(1),
    },
    '& .btn-clear': {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline',
      },
    },
  },
  container: {
    backgroundColor: theme.palette.background.paperDark,
    width: '350px',
    float: 'right',
    height: 'calc(100vh - 5rem)',
    right: (props) => (props.isDrawer === false ? '-100%' : theme.spacing(0)),
    top: '100%',
    transform: 'translateY(-100%)',
    borderRadius: theme.spacing(0),
    position: 'fixed',
    wordWrap: 'break-word',
    zIndex: '1200',
    border: 0,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    transition: 'all 0.4s ease-out',
  },
  activities: {
    overflow: 'auto',
    maxHeight: 'calc(100% - 200px)',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.background.scroll,
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
    },
  },
}));

export default useStyles;
