/* eslint-disable prettier/prettier */
import { Box, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import AppsIcon from "@material-ui/icons/Apps";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ListIcon from "@material-ui/icons/List";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { activityActions } from "actions/Activity/activity.action";
import { boardActions } from "actions/Todos/board.action";
import { userActions } from "actions/User";
import { pathName } from "configs";
import { colors } from "configs/fakeLabel";
import { useInput, useToggle, useToggleMenus } from "hooks";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCurrentUser } from "selectors/auth.selector";
import { getBoards } from "selectors/todos.selector";
import TableUserAdmin from "./components/TableUserAdmin";
import useStyles from "./UserProfile.style";
import clsx from "clsx";

function UserProfile(props) {
  const { id } = useParams();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const role = currentUser.role;
  const boards = useSelector(getBoards);
  const [showModal, toggleModal] = useToggle(false);
  const [showModalEditPro, toggleEditPro] = useToggle(false);
  const [showModalSetColor, toggleSetColor] = useToggle(false);
  const [showOptions, toggleOptions, closeOptions] = useToggleMenus(null);
  const [viewGrid, setViewGrid] = useState(JSON.parse(localStorage.getItem("grid")));
  const [dataBoard, changeDataBoard, resetDataBoard] = useInput("");
  const [editBoard, setEditBoard] = useState({});
  const classes = useStyles();

  useEffect(() => {
    dispatch(userActions.asyncGetMe());
    dispatch(boardActions.asyncGetBoardById(currentUser.boardId));
  }, [id, dispatch]);

  const handleAddBoard = () => {
    dispatch(boardActions.asyncAddBoard(currentUser._id, dataBoard));
    dispatch(
      activityActions.asyncCreateNewActivity({
        text: `${currentUser.username} created this board`,
        boardId: currentUser.boardId
      })
    );
    resetDataBoard();
    toggleModal();
  };

  const renderFormBoard = () => (
    <Dialog
      open={showModal}
      fullWidth
      onClose={toggleModal}
      aria-labelledby="form-dialog-title-board"
    >
      <DialogTitle id="form-dialog-title">
        "Try to take advantage of every opportunity that comes you way"
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Workspace's {currentUser.username}</DialogContentText>
        <TextField
          variant="outlined"
          label="Tên board"
          size="small"
          onChange={changeDataBoard}
          value={dataBoard}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          classes={{ root: classes.btn }}
          onClick={toggleModal}
          color="primary"
        >
          {translate("cancel")}
        </Button>
        <Button
          variant="outlined"
          classes={{ root: classes.btn }}
          onClick={handleAddBoard}
          color="primary"
        >
          {translate("create_board")}
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
      <DialogTitle id="form-dialog-title">Project details</DialogTitle>
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
            <Avatar src={currentUser?.image} />
            <span>{currentUser?.username}</span>
            <div className={clsx(classes.toolTipContent, "tooltip-content")}>
              <span>Project Owner</span>
              <Divider style={{ backgroundColor: "#fff" }} />
              <span>{currentUser?.username}</span>
            </div>
          </div>
          <div className={classes.tooltipOptionPro}>date</div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          classes={{ root: classes.btn }}
          onClick={toggleEditPro}
          color="primary"
        >
          {translate("cancel")}
        </Button>
        <Button
          variant="outlined"
          classes={{ root: classes.btn }}
          color="primary"
          onClick={updateEditBoard}
        >
          {translate("update")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderFormSetColorProject = () => {
    <Dialog
      open={showModalSetColor}
      fullWidth
      onClose={toggleSetColor}
      aria-labelledby="form-dialog-edit-color"
    >
      <DialogTitle id="form-dialog-title">Project</DialogTitle>
      <DialogContent>
        <div>
          {colors.map((color, index) => (
            <span
              key={index}
              style={{
                backgroundColor: `${color}`,
                width: "2rem",
                height: "2rem",
                borderRadius: "4px"
              }}
            ></span>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          classes={{ root: classes.btn }}
          onClick={toggleSetColor}
          color="primary"
        >
          {translate("cancel")}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} color="primary">
          {translate("update")}
        </Button>
      </DialogActions>
    </Dialog>;
  };

  const chooseColorProject = () => {
    toggleSetColor();
    closeOptions();
  };

  const editProject = (id, title) => {
    if (id && title) {
      setEditBoard({
        id,
        value: title
      });
    }
    toggleEditPro();
    closeOptions();
  };

  const updateEditBoard = () => {
    dispatch(boardActions.asyncUpdateTitleBoardById(editBoard));
    toggleEditPro();
  };

  const showViewTiles = () => {
    // true là view grid
    setViewGrid(true);
    localStorage.setItem("grid", true);
  };

  const showViewLists = () => {
    // false là view list
    setViewGrid(false);
    localStorage.setItem("grid", false);
  };

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.userInfo}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Avatar
                alt={currentUser?.username}
                src={currentUser?.image}
                className={classes.large}
              />
            </Grid>
            <Grid item xs={12} md={5}>
              <Typography variant="h3" component="h3" gutterBottom>
                {currentUser?.username}
              </Typography>
              <Typography variant="h5" component="h5">
                {currentUser?.bio}
              </Typography>
              <Typography variant="h5" component="h5">
                {currentUser?.email}
              </Typography>
            </Grid>
            <Grid item xs md={4}>
              <Link to={pathName.USER_EDIT} className={classes.link}>
                {translate("edit_profile")}
              </Link>
            </Grid>
          </Grid>
        </div>
        <div className={classes.userBoard}>
          <div className={classes.lineText}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {translate("board")} của {currentUser?.username}
            </Typography>
          </div>
          <Box display="flex" justifyContent="flex-end">
            <div className={classes.viewIcon} onClick={showViewLists}>
              <ListIcon />
            </div>
            <div className={classes.viewIcon} onClick={showViewTiles}>
              <AppsIcon />
            </div>
          </Box>
          <div className={classes.gallaryRow}>
            {boards.map(board => (
              <div
                className={viewGrid ? `${classes.gallaryTiles}` : `${classes.gallaryLists}`}
                key={board._id}
              >
                <div className={!viewGrid ? classes.gallaryListLeft : null}>
                  <Paper
                    elevation={4}
                    className={classes.paper}
                    style={{
                      backgroundColor: `${
                        board.image?.color === "#FFFFFF" ? "#4D5465" : board.image?.color
                      }`
                    }}
                  >
                    <Box p={1} component={Link} to={`/todos/${board._id}/${board.slug}`}>
                      <Typography variant="h5" component="h5">
                        {board?.title}
                      </Typography>
                    </Box>
                  </Paper>
                </div>
                <div className={viewGrid ? classes.gallaryTileOptions : classes.gallaryListRight}>
                  <IconButton
                    aria-controls={board?._id}
                    aria-haspopup="true"
                    onClick={toggleOptions}
                  >
                    <MoreHorizIcon fontSize="large" />
                  </IconButton>
                  <Menu
                    id={board?._id}
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
                    <MenuItem onClick={chooseColorProject}>
                      <Box
                        width="100%"
                        display="flex"
                        justifyContent="flex-start"
                        alignItems="center"
                      >
                        <span
                          style={{
                            marginRight: "7px",
                            backgroundColor: `${board?.image?.color}`,
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
                    <MenuItem onClick={() => editProject(board?._id, board?.title)}>
                      Edit project details
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ))}
            <div className={viewGrid ? `${classes.gallaryTiles}` : `${classes.gallaryLists}`}>
              <Box
                className={viewGrid ? classes.boxAddTodo : classes.gallaryListAddTodo}
                onClick={toggleModal}
              >
                <AddIcon fontSize="large" />
              </Box>
            </div>
          </div>
        </div>

        {/* Admin PM */}
        {role === "admin" ? (
          <Box mt={6}>
            <div className={classes.lineText}>
              <Typography variant="h4" component="h4" className={classes.title}>
                Project Management
              </Typography>
            </div>
            <div>
              <div>
                <input type="text" />
              </div>
              <div className="table">
                <TableUserAdmin />
              </div>
            </div>
          </Box>
        ) : null}
        {showModal && renderFormBoard()}
        {showModalEditPro && renderFormEditProject()}
        {showModalSetColor && renderFormSetColorProject()}
      </Container>
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
