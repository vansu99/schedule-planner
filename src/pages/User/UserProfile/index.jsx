import { boardActions } from "actions/Todos/board.action";
import { activityActions } from "actions/Activity/activity.action";
import { useInput } from "hooks";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCurrentUser } from "selectors/auth.selector";
import { getBoards } from "selectors/todos.selector";
import { userActions } from "actions/User";
import UserEdit from "../UserProfileEdit/components/EditForm";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ButtonComponent from "components/Button";
import "./userProfile.scss";
import { Box, TextField } from "@material-ui/core";
import { pathName } from "configs";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    flexGrow: 1,
    "& > .MuiContainer-maxWidthLg": {
      maxWidth: "860px"
    }
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    margin: "0 auto"
  },
  btnMargin: {
    marginBottom: theme.spacing(1)
  },
  userInfo: {
    marginBottom: theme.spacing(14)
  },
  userBoard: {
    "& .MuiGrid-container": {
      marginTop: theme.spacing(3)
    }
  },
  paper: {
    color: "#ffffff",
    "& > .MuiBox-root": {
      display: "block",
      color: "#ffffff",
      height: "100px"
    }
  },
  boxAddTodo: {
    border: "2px dotted #d1d2d2",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    cursor: "pointer"
  },
  link: {
    color: theme.palette.text.primary,
    fontSize: "1.4rem",
    fontWeight: "500",
    border: "1px solid #dbdbdb",
    borderRadius: "4px",
    backgroundColor: "transparent",
    padding: "6px 20px",
    outline: "none",
    "&:hover": {
      backgroundColor: "#e7e3e340"
    }
  },
  lineText: {
    textAlign: "center",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      width: "100%",
      height: "1px",
      top: "50%",
      left: 0,
      transform: "translateY(-50%)",
      backgroundColor: "currentColor"
    }
  },
  title: {
    display: "inline-block",
    backgroundColor: theme.palette.background.default,
    position: "relative",
    zIndex: 2,
    padding: "1rem",
    fontWeight: 600,
    color: theme.palette.text.primary
  },
  btn: {
    fontSize: "1.1rem"
  }
}));

function UserProfile(props) {
  const { id } = useParams();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentUser = useSelector(getCurrentUser);
  const boards = useSelector(getBoards);
  const [showModal, setShowModal] = useState(false);
  const [dataBoard, changeDataBoard, resetDataBoard] = useInput("");

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
    setShowModal(false);
  };

  const renderFormBoard = () => (
    <Dialog open={showModal} fullWidth onClose={() => setShowModal(false)} aria-labelledby="form-dialog-title-board">
      <DialogTitle id="form-dialog-title">"Try to take advantage of every opportunity that comes you way"</DialogTitle>
      <DialogContent>
        <DialogContentText>Workspace's {currentUser.username}</DialogContentText>
        <TextField variant="outlined" label="Tên board" size="small" onChange={changeDataBoard} value={dataBoard} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={() => setShowModal(false)} color="primary">
          Hủy
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={handleAddBoard} color="primary">
          {translate("create_board")}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.userInfo}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Avatar alt={currentUser?.username} src={currentUser?.image} className={classes.large} />
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

          <Grid container spacing={4}>
            {boards.map(board => (
              <Grid item xs={12} sm={6} md={4} key={board._id}>
                <Paper
                  elevation={4}
                  className={classes.paper}
                  style={{ backgroundColor: `${board.image?.color === "#FFFFFF" ? "#4D5465" : board.image?.color}` }}
                >
                  <Box p={1} component={Link} to={`/todos/${board._id}/${board.slug}`}>
                    <Typography variant="h5" component="h5">
                      {board?.title}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
            <Grid item xs md={4}>
              <Box className={classes.boxAddTodo} onClick={() => setShowModal(true)}>
                <AddIcon fontSize="large" />
              </Box>
            </Grid>
          </Grid>
        </div>
        {showModal && renderFormBoard()}
      </Container>
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
