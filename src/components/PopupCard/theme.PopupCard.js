import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    top: "100%",
    left: "80%",
    zIndex: 9,
    transform: "translateX(-80%)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    width: "30rem",
    maxHeight: "30rem",
    color: "#000000",
    filter: "drop-shadow(0 0 3px #dbdbdb)",
    "&::before": {
      position: "absolute",
      content: "''",
      width: "2.5rem",
      height: "1rem",
      backgroundColor: "#FFF",
      bottom: "100%",
      left: "80%",
      transform: "translateX(-100%)",
      clipPath: "polygon(50% 0,100% 100%,0 100%)",
      boxShadow: "0 0 30px 0 #999"
    },
    "& > .MuiSvgIcon-root": {
      fontSize: "5rem",
      marginBottom: theme.spacing(2)
    },
    "& > .MuiTypography-root": {
      fontWeight: 400,
      textAlign: "center",
      padding: ".6rem 0"
    }
  },
  ul: {
    listStyleType: "none",
    maxHeight: "30rem",
    overflowY: "auto",
    backgroundColor: "#FFFFFF"
  }
}));

export default useStyles;
