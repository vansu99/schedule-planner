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
  TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CancelIcon from '@material-ui/icons/Cancel';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { boardActions } from 'actions/Todos/board.action';
import clsx from 'clsx';
import { formatDate } from 'helpers';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import StyledRadio from 'components/FormControls/Radio';
import { colors } from 'configs/fakeLabel';
import { useToggle, useToggleMenus } from 'hooks';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomDateTimePicker from 'components/CustomDatePicker';
import { getCurrentUser } from 'selectors/auth.selector';
import useStyles from '../UserProfile.style';
import { appConstants } from 'configs';
import { useEffect } from 'react';

function UserBoards({ _id, slug, title, image, duedate, view, onBookmark, bookmarks }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const { t: translate } = useTranslation();
  const [editBoard, setEditBoard] = useState({});
  const [colorBoard, setColorBoard] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showModalEditPro, toggleEditPro] = useToggle(false);
  const [showModalEditColor, toggleEditColor] = useToggle(false);
  const [showDueDate, toggleDueDate] = useToggle(false);
  const [showOptions, toggleOptions, closeOptions] = useToggleMenus(null);

  const editColorProject = () => {
    toggleEditColor();
    closeOptions();
  };

  const editProject = () => {
    if (_id && title) {
      setEditBoard({
        id: _id,
        value: title,
      });
    }
    toggleEditPro();
    closeOptions();
  };

  const editDueDateProject = date => {
    const newData = {
      id: _id,
      duedate: date,
    };
    dispatch(boardActions.asyncUpdateDueDateBoardById(newData));
  };

  const updateEditBoard = () => {
    dispatch(boardActions.asyncUpdateTitleBoardById(editBoard));
    toggleEditPro();
  };

  const editColorBoard = () => {
    dispatch(boardActions.asyncUpdateColorBoardById({ _id, colorBoard }));
    toggleEditColor();
  };

  const handleBookmark = () => {
    // handle status bookmark
    if (bookmarks) {
      if (bookmarks.some(item => item._id === _id)) {
        setIsBookmarked(true);
      } else {
        setIsBookmarked(false);
      }
    }
  };

  useEffect(() => {
    handleBookmark();
  }, [bookmarks]);

  const bookmarkCheatsheet = () => {
    const itemBookmarked = { _id, title, slug, image };
    if (typeof window !== 'undefined') {
      if (isBookmarked) {
        // if already bookmarked remove bookmark
        const newArr = bookmarks.filter(item => item._id !== _id);
        onBookmark && onBookmark(newArr);
        window.localStorage.setItem(appConstants.BOOKMARK, JSON.stringify(newArr));
        handleBookmark();
      } else {
        // adding bookmark
        const newItemBookmarked = [...bookmarks, itemBookmarked];
        onBookmark && onBookmark(newItemBookmarked);
        window.localStorage.setItem(appConstants.BOOKMARK, JSON.stringify(newItemBookmarked));
        //handleBookmark();
      }
    }
  };

  const renderFormSetColorProject = () => (
    <Dialog open={showModalEditColor} fullWidth onClose={toggleEditColor} aria-labelledby="form-dialog-edit-color">
      <DialogTitle id="form-dialog-title" className={classes.dialogTitle}>
        {translate('pro_details')}
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
          {translate('cancel')}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} color="primary" onClick={editColorBoard}>
          {translate('update')}
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
        {translate('pro_details')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Workspace's {currentUser.username}</DialogContentText>
        <TextField
          variant="outlined"
          label="Name your board"
          size="small"
          name="board"
          value={editBoard.value}
          onChange={e => setEditBoard({ ...editBoard, value: e.target.value })}
          fullWidth
        />
        <Box display="flex" alignItems="center" justifyContent="space-between" my={3} px={1}>
          <div className={classes.tooltipOptionPro}>
            <div className={classes.optionInfoWrapper}>
              <div className={classes.infoProjectOwner}>
                <Avatar src={currentUser?.image} />
                <span>{currentUser?.username}</span>
                <div className={clsx(classes.toolTipContent, 'tooltip-content')}>
                  <span>{translate('pro_owner')}</span>
                  <Divider style={{ backgroundColor: '#fff' }} />
                  <span>{currentUser?.username}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.tooltipOptionPro}>
            <div className={classes.optionInfoWrapper}>
              {!!duedate ? (
                <div className={classes.noDueDate}>
                  <div className="duedate-content" onClick={toggleDueDate}>
                    <div className="icon-duedate">
                      <CalendarTodayIcon />
                    </div>
                    <span>{formatDate(duedate)}</span>
                  </div>
                  {showDueDate && (
                    <div className="set-duedate">
                      <CustomDateTimePicker dueDate={duedate || new Date()} onSubmit={editDueDateProject} />
                      <span className={classes.optionIconDelete} onClick={() => editDueDateProject(null)}>
                        <CancelIcon fontSize="large" />
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className={classes.noDueDate}>
                  <div className="duedate-content" onClick={toggleDueDate}>
                    <div className="icon-duedate">
                      <CalendarTodayIcon />
                    </div>
                    <span>No Date</span>
                  </div>
                  {showDueDate && (
                    <div className="set-duedate">
                      <CustomDateTimePicker dueDate={duedate || new Date()} onSubmit={editDueDateProject} />
                    </div>
                  )}
                </div>
              )}
              {/* <div className={clsx(classes.toolTipContent, 'tooltip-content')}>
                <span>Due Date</span>
                <Divider style={{ backgroundColor: '#fff' }} />
                {!!duedate ? <span>{formatDate(duedate)}</span> : <span>Let the team</span>}
              </div> */}
            </div>
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" classes={{ root: classes.btn }} onClick={toggleEditPro} color="primary">
          {translate('cancel')}
        </Button>
        <Button variant="outlined" classes={{ root: classes.btn }} color="primary" onClick={updateEditBoard}>
          {translate('update')}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      <Box width="100%" display="flex" alignItems="center" justifyContent="space-between">
        <div className={!view ? classes.gallaryListLeft : classes.gallaryTileWrapper}>
          <Paper
            elevation={4}
            className={classes.paper}
            style={{
              backgroundColor: `${image === '#FFFFFF' ? '#4D5465' : image}`,
            }}
          >
            <Box p={1} component={Link} to={`/todos/${_id}/${slug}`}>
              <Typography variant="h5" component="h5">
                {title}
              </Typography>
            </Box>
          </Paper>
          <div className={classes.bookmarkWrapper} onClick={bookmarkCheatsheet}>
            {isBookmarked ? (
              <div className={classes.bookmark}>
                <BookmarkIcon />
              </div>
            ) : (
              <div className={classes.bookmark}>
                <BookmarkBorderIcon />
              </div>
            )}
          </div>
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
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem onClick={editColorProject}>
              <Box width="100%" display="flex" justifyContent="flex-start" alignItems="center">
                <span
                  style={{
                    marginRight: '7px',
                    backgroundColor: `${image}`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '20px',
                    height: '20px',
                    borderRadius: '2px',
                    border: '2px solid rgb(184 182 182)',
                  }}
                ></span>
                <span>Set colors</span>
              </Box>
            </MenuItem>
            <MenuItem onClick={editProject}>Edit project details</MenuItem>
          </Menu>
        </div>
      </Box>
      {showModalEditPro && renderFormEditProject()}
      {showModalEditColor && renderFormSetColorProject()}
    </React.Fragment>
  );
}

export default UserBoards;
