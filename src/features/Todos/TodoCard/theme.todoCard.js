import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  todoCardLeft: {
    width: "calc(70% - 1rem)",
    marginRight: "1rem"
  },
  todoCardRight: {
    width: "calc(30% - 1rem)",
    marginLeft: "1rem",
    "& > .MuiTypography-h4": {
      textTransform: "uppercase"
    }
  },
  todoCardLabels: {
    marginBottom: theme.spacing(3.2)
  },
  todoCardMembers: {
    marginBottom: theme.spacing(3.2)
  },
  todoCardTitle: {
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    "& > .MuiSvgIcon-root": {
      marginRight: theme.spacing(1)
    }
  },
  todoCardRadioLabel: {
    cursor: "pointer",
    width: "100%",
    "& .MuiRadio-colorSecondary.Mui-checked": {
      backgroundColor: "red"
    }
  },
  todoCardDeadline: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    userSelect: "none",
    borderRadius: "4px",
    border: "1px solid #d1d1d1",
    backgroundColor: "#FFFFFF",
    padding: ".5rem 1rem",
    fontWeight: "400",
    "& > .MuiSvgIcon-root": {
      marginRight: theme.spacing(1)
    }
  },
  todoCardDescription: {},
  todoCardCheckList: {},
  todoCardComments: {},


  chipEl: {
    fontSize: "1.3rem",
    marginRight: theme.spacing(1.5)
  },
  margin: {
    margin: theme.spacing(2)
  },
  btnMarginRight: {
    marginRight: theme.spacing(1)
  },
  btnMarginTop: {
    marginTop: theme.spacing(3)
  },
  chkCompletedTodo: {
    marginBottom: theme.spacing(2)
  },
  formControlLabel: {
    "& .MuiTypography-body1": {
      fontSize: "1.7rem",
      fontWeight: "bold",
      textTransform: "uppercase"
    }
  },
  smallAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  },
  paper: {
    marginBottom: "6px"
  },
  card: {
    "& .MuiCardContent-root:last-child": {
      paddingBottom: "16px"
    },
    position: "relative",
    "&:hover .MuiIconButton-root": {
      opacity: 1,
      visibility: "visible"
    }
  },
  box: {
    "& > .MuiChip-root": {
      marginRight: theme.spacing(1),
      fontSize: "12px",
      color: "#FFFFFF"
    },

    "& > .MuiIconButton-root": {
      opacity: 0,
      visibility: "hidden",
      padding: "5px",
      transition: "all 0.25s ease"
    }
  }
}));

export default useStyles;
