import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    flexGrow: 1,
    "& > .MuiContainer-maxWidthLg": {
      maxWidth: "860px"
    }
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "0 auto"
  },
  btnMargin: {
    marginBottom: theme.spacing(1)
  },
  userInfo: {
    marginBottom: theme.spacing(14)
  },
  userBoard: {
    "& .MuiGrid-container": {
      marginTop: theme.spacing(3)
    }
  },
  paper: {
    color: "#ffffff",
    "& > .MuiBox-root": {
      display: "block",
      color: "#ffffff",
      height: "100px"
    }
  },
  boxAddTodo: {
    border: "5px dotted #d1d2d2",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    cursor: "pointer"
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: "1.4rem",
    fontWeight: "500",
    border: "1px solid #dbdbdb",
    borderRadius: "4px",
    backgroundColor: "transparent",
    padding: "6px 20px",
    outline: "none",
    "&:hover": {
      backgroundColor: "#e7e3e340"
    }
  },
  lineText: {
    textAlign: "center",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "1px",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
      backgroundColor: "currentColor"
    }
  },
  title: {
    display: "inline-block",
    backgroundColor: theme.palette.background.default,
    position: "relative",
    zIndex: 2,
    padding: "1rem",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  btn: {
    fontSize: "1.1rem"
  },
  viewIcon: {
    marginLeft: "1rem",
    border: "1px solid #dadada",
    borderRadius: "4px",
    cursor: "pointer",
    "& > svg": {
      fontSize: "2.5rem",
      verticalAlign: "middle"
    },
    "&:hover": {
      backgroundColor: "rgba(245,238,238,0.86)"
    }
  },
  gallaryRow: {
    marginTop: "2rem",
    marginLeft: "-1rem",
    marginRight: "-1rem",
    display: "flex",
    justifyContent: "flex-start",
    flexFlow: "row wrap"
  },
  gallaryLists: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    "&:not(:last-child)": {
      borderBottom: "1px solid #dadada",
      paddingBottom: "1rem"
    }
  },
  gallaryListLeft: {
    width: "10rem",
    minWidth: "10rem",
    overflow: "hidden",
    height: "100%"
  },
  gallaryListAddTodo: {
    width: "10rem",
    height: "10rem",
    minWidth: "10rem",
    overflow: "hidden",
    borderRadius: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "5px dotted #dadada",
    cursor: "pointer"
  },
  gallaryListRight: {
    flex: "1",
    overflow: "hidden",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    "& > svg": {
      fontSize: "2.5rem",
      color: "#a9a2a2",
      cursor: "pointer"
    }
  },
  gallaryTiles: {
    margin: "0 1rem",
    width: "calc(33.33% - 2rem)",
    position: "relative"
  },
  gallaryTileOptions: {
    position: "absolute",
    top: "0px",
    right: "10px",
    transition: "all 0.15s linear",
    cursor: "pointer",
    borderRadius: "5px",
    "& > button": {
      color: "#fff",
      verticalAlign: "middle"
    }
  }
}));

export default useStyles;
