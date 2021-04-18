import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "selectors/auth.selector";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core";
import { commentActions } from "actions/Todos/comment.action";

const useStyles = makeStyles(theme => ({
  menuTitile: {
    fontSize: "1.5rem"
  },
  menuIcon: {
    fontSize: "1.5rem",
    marginRight: "1rem"
  },
  menuButtonIcon: {
    padding: 0
  }
}));

function CommentMenu({ comment, setOnEdit }) {
  const currentUser = useSelector(getCurrentUser);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveComment = () => {
    dispatch(commentActions.asyncRemoveComment(comment._id, comment.cardId));
  };
  return (
    <div className="todoCard-details__comments-subMenu">
      {comment.user._id === currentUser._id && (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={classes.menuButtonIcon}
          >
            <i className="bx bx-dots-vertical-rounded" style={{ fontSize: "2rem" }}></i>
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 30 * 4.5,
                width: "20ch"
              }
            }}
          >
            <MenuItem onClick={() => setOnEdit(true)}>
              <i className={`bx bx-pencil ${classes.menuIcon}`}></i>
              <span className={classes.menuTitile}>Edit</span>
            </MenuItem>
            <MenuItem onClick={handleRemoveComment}>
              <i className={`bx bx-trash-alt ${classes.menuIcon}`}></i>
              <span className={classes.menuTitile}>Remove</span>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

CommentMenu.propTypes = {
  comment: PropTypes.object
};

export default CommentMenu;
