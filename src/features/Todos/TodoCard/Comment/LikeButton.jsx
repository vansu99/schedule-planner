import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const useStyles = makeStyles(theme => ({
  likeIcon: {
    fontSize: "2rem",
    cursor: "pointer"
  }
}));

function LikeButton({ isLike, handleLike, handleUnLike }) {
  const classes = useStyles();

  const _onUnLike = () => {
    if (handleUnLike) {
      handleUnLike();
    }
  };
  return (
    <>
      {isLike === false ? (
        <FavoriteBorder
          className={`${classes.likeIcon}`}
          onClick={handleLike}
          style={{ filter: isLike ? "brightness(4.5)" : "invert(1)" }}
        />
      ) : (
        <FavoriteIcon color="secondary" className={`${classes.likeIcon} bx bx-heart`} onClick={_onUnLike} />
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
