import { Dialog, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  paper: {
    overflow: 'auto',
    maxWidth: '400px',
  },
  contentDialog: {
    color: theme.palette.text.primary,
  },
}));

const DialogComponent = ({ content, onClick, open, handleClickAway, id }) => {
  const classes = useStyles();
  const { t: translate } = useTranslation();

  return (
    <Dialog
      id={id}
      open={open}
      onClose={() => handleClickAway(false)}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <Paper elevation={1} className={classes.paper}>
        <DialogTitle>{translate('are_you_sure')}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.contentDialog}>
            Bạn có chắc chắn muốn xóa{' '}
            <span style={{ color: '#3A61C8' }}>{content}</span> này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={onClick}
            autoFocus
          >
            {translate('remove')}
          </Button>
        </DialogActions>
      </Paper>
    </Dialog>
  );
};

DialogComponent.propTypes = {
  content: PropTypes.string,
  handleClickAway: PropTypes.func,
  onClick: PropTypes.func,
};

export default DialogComponent;
