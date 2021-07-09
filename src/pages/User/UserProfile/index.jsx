import { Box, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import AppsIcon from '@material-ui/icons/Apps';
import ListIcon from '@material-ui/icons/List';
import { activityActions } from 'actions/Activity/activity.action';
import { boardActions } from 'actions/Todos/board.action';
import { userActions } from 'actions/User';
import { pathName } from 'configs';
import { useInput, useToggle } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getCurrentUser } from 'selectors/auth.selector';
import { getBoards } from 'selectors/todos.selector';
import TableUserAdmin from './components/TableUserAdmin';
import useStyles from './UserProfile.style';

import UserBoards from './components/UserBoards';

function UserProfile(props) {
  const { id } = useParams();
  const { t: translate } = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const role = currentUser.role;
  const boards = useSelector(getBoards);
  const [showModal, toggleModal] = useToggle(false);
  const [viewGrid, setViewGrid] = useState(JSON.parse(localStorage.getItem('grid')));
  const [dataBoard, changeDataBoard, resetDataBoard] = useInput('');
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
        boardId: currentUser.boardId,
      }),
    );
    resetDataBoard();
    toggleModal();
  };

  const renderFormBoard = () => (
    <Dialog open={showModal} fullWidth onClose={toggleModal} aria-labelledby="form-dialog-title-board">
      <DialogTitle id="form-dialog-title">"Try to take advantage of every opportunity that comes you way"</DialogTitle>
      <DialogContent>
        <DialogContentText>Workspace's {currentUser.username}</DialogContentText>
        <TextField variant="outlined" label="Tên board" size="small" onChange={changeDataBoard} value={dataBoard} />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={toggleModal} color="primary">
          {translate('cancel')}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={handleAddBoard} color="primary">
          {translate('create_board')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const showViewTiles = () => {
    // true là view grid
    setViewGrid(true);
    localStorage.setItem('grid', true);
  };

  const showViewLists = () => {
    // false là view list
    setViewGrid(false);
    localStorage.setItem('grid', false);
  };

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
                {translate('edit_profile')}
              </Link>
            </Grid>
          </Grid>
        </div>
        <div className={classes.userBoard}>
          <div className={classes.lineText}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {translate('board')} của {currentUser?.username}
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
              <div className={viewGrid ? `${classes.gallaryTiles}` : `${classes.gallaryLists}`} key={board._id}>
                <UserBoards {...board} view={viewGrid} />
              </div>
            ))}
            <div className={viewGrid ? `${classes.gallaryTiles}` : `${classes.gallaryLists}`}>
              <Box className={viewGrid ? classes.boxAddTodo : classes.gallaryListAddTodo} onClick={toggleModal}>
                <AddIcon fontSize="large" />
              </Box>
            </div>
          </div>
        </div>

        {/* Admin PM */}
        {role === 'admin' ? (
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
      </Container>
    </div>
  );
}

UserProfile.propTypes = {};

export default UserProfile;
