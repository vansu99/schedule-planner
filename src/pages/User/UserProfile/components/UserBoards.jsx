import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { boardActions } from "actions/Todos/board.action";
import clsx from "clsx";
import StyledRadio from "components/FormControls/Radio";
import { colors } from "configs/fakeLabel";
import { useToggle, useToggleMenus } from "hooks";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUser } from "selectors/auth.selector";
import useStyles from "../UserProfile.style";

function UserBoards({ _id, slug, title, image, view }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const { t: translate } = useTranslation();
  const [editBoard, setEditBoard] = useState({});
  const [colorBoard, setColorBoard] = useState("");
  const [showModalEditPro, toggleEditPro] = useToggle(false);
  const [showModalEditColor, toggleEditColor] = useToggle(false);
  const [showOptions, toggleOptions, closeOptions] = useToggleMenus(null);

  const editColorProject = () => {
    toggleEditColor();
    closeOptions();
  };

  const editProject = () => {
    if (_id && title) {
      setEditBoard({
        id: _id,
        value: title
      });
    }
    toggleEditPro();
    closeOptions();
  };

  const updateEditBoard = () => {
    //dispatch(boardActions.asyncUpdateTitleBoardById(editBoard));
    toggleEditPro();
  };

  const editColorBoard = () => {
    dispatch(boardActions.asyncUpdateColorBoardById({ _id, colorBoard }));
    toggleEditColor();
  };

  const renderFormSetColorProject = () => (
    <Dialog open={showModalEditColor} fullWidth onClose={toggleEditColor} aria-labelledby="form-dialog-edit-color">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {translate("pro_details")}
      </DialogTitle>
      <DialogContent>
        <h3 style={{ fontWeight: 500 }}>Choose a color for your project</h3>
        <Box display="flex" alignItems="center" mt={2}>
          {colors.map((color, index) => (
            <StyledRadio key={index} name="color" value={color} setColorBoard={setColorBoard} checked={image} />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={toggleEditColor} color="primary">
          {translate("cancel")}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} color="primary" onClick={editColorBoard}>
          {translate("update")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderFormEditProject = () => (
    <Dialog
      open={showModalEditPro}
      fullWidth
      onClose={toggleEditPro}
      aria-labelledby="form-dialog-edit-project"
      className={classes.customDialog}
    >
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {translate("pro_details")}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Workspace's {currentUser.username}</DialogContentText>
        <TextField
          variant="outlined"
          label="Tên board"
          size="small"
          name="board"
          value={editBoard.value}
          onChange={e => setEditBoard({ ...editBoard, value: e.target.value })}
          fullWidth
        />
        <Box display="flex" alignItems="center" justifyContent="space-between" my={3} px={1}>
          <div className={classes.tooltipOptionPro}>
            <div className={classes.optionInfoWrapper}>
              <Avatar src={currentUser?.image} />
              <span>{currentUser?.username}</span>
              <div className={clsx(classes.toolTipContent, "tooltip-content")}>
                <span>{translate("pro_owner")}</span>
                <Divider style={{ backgroundColor: "#fff" }} />
                <span>{currentUser?.username}</span>
              </div>
            </div>
          </div>
          <div className={classes.tooltipOptionPro}>
            <div className={classes.optionInfoWrapper}>
              <span>Due Date</span>
              <div className={clsx(classes.toolTipContent, "tooltip-content")}>
                <span>Due Date</span>
                <Divider style={{ backgroundColor: "#fff" }} />
                <span>Let the team</span>
              </div>
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={toggleEditPro} color="primary">
          {translate("cancel")}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} color="primary" onClick={updateEditBoard}>
          {translate("update")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      <div>
        <div className={!view ? classes.gallaryListLeft : null}>
          <Paper
            elevation={4}
            className={classes.paper}
            style={{
              backgroundColor: `${image === "#FFFFFF" ? "#4D5465" : image}`
            }}
          >
            <Box p={1} component={Link} to={`/todos/${_id}/${slug}`}>
              <Typography variant="h5" component="h5">
                {title}
              </Typography>
            </Box>
          </Paper>
        </div>
        <div className={view ? classes.gallaryTileOptions : classes.gallaryListRight}>
          <IconButton aria-controls={_id} aria-haspopup="true" onClick={toggleOptions}>
            <MoreHorizIcon fontSize="large" />
          </IconButton>
          <Menu
            id={_id}
            anchorEl={showOptions}
            keepMounted
            open={Boolean(showOptions)}
            onClose={closeOptions}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <MenuItem onClick={editColorProject}>
              <Box width="100%" display="flex" justifyContent="flex-start" alignItems="center">
                <span
                  style={{
                    marginRight: "7px",
                    backgroundColor: `${image}`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    width: "20px",
                    height: "20px",
                    borderRadius: "2px",
                    border: "2px solid rgb(184 182 182)"
                  }}
                ></span>
                <span>Set colors</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={editProject}>Edit project details</MenuItem>
          </Menu>
        </div>
      </div>
      {showModalEditPro && renderFormEditProject()}
      {showModalEditColor && renderFormSetColorProject()}
    </React.Fragment>
  );
}

export default UserBoards;
