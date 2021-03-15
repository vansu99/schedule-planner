import React from "react";
import PropTypes from "prop-types";

function ProgressBar({ completed }) {
  const container = {
    height: "1.8rem",
    backgroundColor: "#fff",
    marginBotton: "1.5rem"
  };
  const fillerStyles = {
    width: `${completed}%`,
    backgroundColor: "rgba(255, 82, 82, .7)",
    transition: "width 1s ease-in-out",
    height: "100%"
  };

  return (
    <div className="progress-bar-container" style={container}>
      <div className="progress-filler" style={fillerStyles}>
        <span
          className="progress-label"
          style={{
            display: "block",
            color: "#333",
            paddingRight: "0.7rem",
            textAlign: "right",
            fontSize: "1.3rem",
            fontWeight: "bold"
          }}
        >{`${completed}%`}</span>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  completed: PropTypes.any.isRequired
};

export default ProgressBar;
