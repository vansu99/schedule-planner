import { Box, Paper, Typography, Button, IconButton } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import AssessmentIcon from '@material-ui/icons/Assessment';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { pathName } from 'configs';
import { boardActions } from 'actions/Todos/board.action';
import { getCurrentUser } from 'selectors/auth.selector';
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from 'components/Button';
import LinkComponent from 'components/Link';
import ActivityPage from 'components/Activity';
import Background from 'components/Background';

function DrawerComponent({ isDrawer, handleToogleDrawer, board, setBackground }) {
  const classes = useStyles({ isDrawer });
  const { t: translate } = useTranslation();
  const history = useHistory();
  const { boardId } = useParams();
  const dispatch = useDispatch();
  const [showBackground, setShowBackground] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const { _id } = useSelector(getCurrentUser);

  const handleClose = () => {
    if (handleToogleDrawer) {
      handleToogleDrawer();
    }
    if (showBackground) {
      setShowBackground(false);
    }
  };

  const handleToggleBackground = () => {
    setShowBackground(prev => !prev);
  };

  return (
    <React.Fragment>
      {!showBackground && (
        <Paper className={classes.container} variant="outlined" elevation={1}>
          <Typography variant="h5" component="h5" align="center" className={classes.title}>
            Menu
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Typography>
          <Divider variant="middle" />
          <Box p={2}>
            <ButtonComponent
              text={translate('delete_board')}
              icon={<DeviceHubIcon />}
              handleClick={() => setDeleting(true)}
              type="select"
            />
            <ButtonComponent
              text={translate('change_bg')}
              icon={
                <span
                  style={{
                    marginRight: '7px',
                    backgroundColor: `${board?.image?.color}`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    width: '20px',
                    height: '20px',
                    borderRadius: '2px',
                    border: '2px solid rgb(184 182 182)',
                  }}
                ></span>
              }
              type="select"
              handleClick={handleToggleBackground}
            />
            <LinkComponent
              text={translate('calendar')}
              href={`/todos/${boardId}/timetable`}
              icon={<CalendarTodayIcon />}
            />
            <LinkComponent text={translate('reports')} href={`/users/${_id}/report`} icon={<AssessmentIcon />} />
            <Dialog
              open={deleting}
              onClose={() => setDeleting(false)}
              aria-labelledby="delete-dialog-title"
              aria-describedby="delete-dialog-description"
            >
              <DialogTitle id="delete-dialog-title">{translate('are_you_sure')}</DialogTitle>
              <DialogContent>
                <DialogContentText id="delete-dialog-description">
                  Bạn có chắc muốn xóa dự án <span style={{ color: '#3A61C8' }}>{board?.title}</span> này.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="default" onClick={() => setDeleting(false)}>
                  {translate('cancel')}
                </Button>
                <Button
                  onClick={() => {
                    dispatch(boardActions.asyncRemoveBoardById(boardId));
                    history.push(pathName.ROOT);
                  }}
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  {translate('remove')}
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
          <Divider variant="middle" />
          <Box p={2} className={classes.activities}>
            <Typography variant="h5" component="h5" className={classes.titleActivity}>
              <DeviceHubIcon />
              {translate('activity')}
            </Typography>
            <ActivityPage />
          </Box>
        </Paper>
      )}
      {showBackground && (
        <Background
          closeHandler={handleClose}
          setColorBackground={setBackground}
          backHandler={handleToggleBackground}
        />
      )}
    </React.Fragment>
  );
}

DrawerComponent.propTypes = {
  board: PropTypes.object,
  setBackground: PropTypes.func,
  handleToogleDrawer: PropTypes.func,
};

export default DrawerComponent;
