import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  likeIcon: {
    fontSize: "2rem",
    cursor: "pointer"
  }
}));

function LikeButton({ isLike, handleLike, handleUnLike }) {
  const classes = useStyles();
  return (
    <>
      {isLike ? (
        <i className={`${classes.likeIcon} bx bx-heart`} onClick={handleUnLike}></i>
      ) : (
        <i className={`${classes.likeIcon} bx bx-heart`} onClick={handleLike}></i>
      )}
    </>
  );
}

LikeButton.propTypes = {
  isLike: PropTypes.bool,
  handleLike: PropTypes.func,
  handleUnLike: PropTypes.func
};

export default LikeButton;
