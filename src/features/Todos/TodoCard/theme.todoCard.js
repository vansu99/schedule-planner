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
  radio: {
    position: "relative",
    marginRight: theme.spacing(1),
    padding: "9px",
    boxShadow: "none"
  },
  checked: {
    "&::before": {
      position: "absolute",
      content: "''",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      transform: "scale(1.25) translate(1%, 3%)",
      borderRadius: "inherit",
      border: "2px solid #607d8b"
    }
  },
  radioLabel: {
    display: "block",
    position: "absolute",
    left: 0,
    width: "3rem",
    height: "3rem",
    borderRadius: "50%"
  },
  todoCardDeadline: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto",
    userSelect: "none",
    borderRadius: "4px",
    border: "1px solid #d1d1d1",
    backgroundColor: "#FFFFFF",
    color: theme.palette.text.secondary,
    padding: ".5rem 1rem",
    fontWeight: "400",
    "& > .MuiSvgIcon-root": {
      marginRight: theme.spacing(1)
    }
  },
  todoCardDescription: {},
  todoCardCheckList: {},
  todoCardComments: {},
  todoCardTextarea: {
    resize: "none",
    width: "100%",
    padding: "1rem",
    border: "1px solid #d1d1d1"
  },
  todoCardCommentItem: {
    "&:not(:last-child)": {
      marginBottom: "2rem"
    }
  },

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
    },
    "& .MuiCheckbox-root": {
      color: theme.palette.text.primary
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
    // "& .MuiCardContent-root:last-child": {
    //   paddingBottom: "16px"
    // },
    "& .MuiCardContent-root": {
      padding: "8px"
    },
    position: "relative",
    overflow: "hidden"
  },
  box: {
    "& > .MuiChip-root": {
      marginRight: theme.spacing(1)
    },
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    wordWrap: "break-word",
    overflowX: "hidden"

    // "& > .MuiIconButton-root": {
    //   opacity: 0,
    //   visibility: "hidden",
    //   padding: "5px",
    //   transition: "all 0.25s ease"
    // }
  },
  chipTags: {
    fontSize: "1.3rem",
    fontWeight: "400",
    color: "#FFFFFF",
    borderRadius: "4px",
    height: "2.8rem"
  },
  link: {
    textDecoration: "none",
    color: "#333333"
  },
  label: {
    fontSize: "12px",
    color: "#FFF",
    marginRight: theme.spacing(1),
    "& .MuiChip-deleteIcon": {
      color: "#f3f3f3d6"
    }
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    "& .MuiSvgIcon-root": {
      fontSize: "1.8rem",
      marginRight: theme.spacing(1.4)
    },
    "&:hover": {
      backgroundColor: "transparent",
      color: "#EB5757"
    }
  },
  attachments: {
    margin: "1rem 0 1.5rem 0",
    backgroundColor: "rgb(64, 78, 71)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    userSelect: "none",
    height: "200px",
    overflow: "hidden",
    borderRadius: "10px"
  },
  attachmentIem: {
    marginTop: theme.spacing(2),
    minHeight: "80px",
    cursor: "pointer",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "rgba(9, 30, 66, 0.04)"
    },
    display: "flex"
  },
  attachmentImg: {
    backgroundColor: "rgb(64, 78, 71)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    userSelect: "none",
    width: "140px",
    height: "100px",
    overflow: "hidden",
    borderRadius: "10px"
  },
  attachmentContent: {
    marginLeft: theme.spacing(2),
    padding: "10px",
    "& > .MuiTypography-h6": {
      fontSize: "1.6rem",
      fontWeight: "bold"
    }
  },
  attachmentBtn: {
    textDecoration: "underline",
    fontSize: "1.4rem",
    transition: "all linear 0.3s",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
      fontWeight: "bold"
    }
  },
  attachmentInput: {
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
    cursor: "pointer",
    borderRadius: "4px",
    padding: "5px 9px",
    "&:hover": {
      backgroundColor: "rgba(9, 30, 66, 0.04)"
    }
  },
  cardIcon: {
    display: "flex",
    alignItems: "center",
    "& > .MuiSvgIcon-root": {
      marginRight: "4px"
    }
  },
  dueDate: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    backgroundColor: "#DB3246",
    padding: "2px 6px",
    borderRadius: "4px",
    "& > span": {
      marginLeft: "4px"
    }
  }
}));

export default useStyles;
