const MuiButton = {
  root: {
    borderRadius: 2,
    padding: "6px 20px",
    boxShadow: "none",
    boxSizing: "border-box"
  },
  label: {
    textTransform: "capitalize",
    fontSize: 14,
    letterSpacing: 0.17,
    fontWeight: 500,
    height: 16,
    lineHeight: 16
  },
  contained: {
    boxShadow: "none"
  },
  containedPrimary: {
    "&:hover": {
      backgroundColor: "#0057a3"
    },
    "&:active": {
      backgroundColor: "#003b6f",
      boxShadow: "none"
    },
    "&:disabled": {
      color: "#ffffff",
      backgroundColor: "#c5ccd6",
      boxShadow: "none"
    },
    "&:focus": {
      backgroundColor: "#0057a3",
      border: "1px solid #e6f1fa",
      outline: "1px solid #0057a3",
      boxShadow: "none"
    }
  },
  containedSecondary: {
    border: "1px solid #006dcc",
    backgroundColor: "#ffffff",
    color: "#006dcc",
    "&:hover": {
      background: "rgba(1, 109, 204, 0.08)",
      backgroundColor: "",
      borderColor: "#0057a3",
      color: "#0057a3"
    },
    "&:active": {
      background: "rgba(1, 108, 203, 0.16)",
      borderColor: "#013d71",
      boxShadow: "none"
    },
    "&:disabled": {
      color: "#ffffff",
      backgroundColor: "#c5ccd6",
      boxShadow: "none"
    },
    "&:focus": {
      backgroundColor: "#ffffff",
      border: "1px solid #0057a3",
      outline: "1px solid #0057a3",
      boxShadow: "none"
    }
  }
};

export default MuiButton;
