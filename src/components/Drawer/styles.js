import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  drawer: {
    width: `280px`,
    flexShrink: 0
  },
  drawerPaper: {
    width: `280px`,
    paddingBottom: 50,
    backgroundColor: theme.palette.background.paper,
    top: "7%"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    fontSize: 20,
    position: "relative",
    "& > .MuiIconButton-root": {
      position: "absolute",
      top: "22%",
      right: 0
    }
  },
  item: {
    display: "block",
    paddingTop: 0,
    paddingBottom: 0
  },
  itemLeaf: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%"
  },
  buttonLeaf: {
    display: "flex",
    color: theme.palette.text.secondary,
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightRegular,
    "&.depth-0": {
      "& $title": {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    "&:hover": {
      textDecoration: "none"
    }
  },
  icon: {
    display: "flex",
    alignItems: "center",
    fontSize: "20px"
  },
  title: {
    padding: "9px",
    fontSize: "16px",
    position: "relative",
    "& > .MuiIconButton-root": {
      position: "absolute",
      right: 0,
      top: 0
    }
  },
  active: {
    color: theme.palette.secondary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& $icon": {
      color: theme.palette.secondary.main
    }
  },
  navBar_link: {
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    textTransform: "capitalize",
    userSelect: "none"
  },
  titleActivity: {
    display: "flex",
    alignItems: "center",
    color: "#000",
    marginBottom: theme.spacing(1.5),
    "& > .MuiSvgIcon-root": {
      marginRight: theme.spacing(1)
    }
  },
  container: {
    backgroundColor: "#F4F5F7",
    width: "320px",
    float: "right",
    height: "100vh",
    right: props => (props.isDrawer === false ? theme.spacing(-100) : theme.spacing(0)),
    top: "7.1%",
    borderRadius: theme.spacing(0),
    position: "fixed",
    wordWrap: "break-word",
    zIndex: "1200",
    transition: "right 0.7s ease-out"
  }
}));

export default useStyles;
