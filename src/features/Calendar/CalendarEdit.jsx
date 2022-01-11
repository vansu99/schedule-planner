import Backdrop from '@material-ui/core/Backdrop';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { makeStyles } from '@material-ui/core/styles';
import { cardActions } from 'actions/Todos/card.action';
import { calendarActions } from 'actions/Calendar/calendar.action';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CalendarForm from './CalendarForm';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function CalendarEdit({ event }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const openModal = useSelector((state) => state.calendar.open);

  const onSubmit = (content) => {
    dispatch(cardActions.asyncEditDetailTodoCard(event.id, content));
  };

  const handleClose = () => {
    dispatch(calendarActions.closeEditEvent());
  };

  return (
    <React.Fragment>
      <Modal
        id="calendar-edit"
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <CalendarForm event={event} onSubmit={onSubmit} />
        </Fade>
      </Modal>
    </React.Fragment>
  );
}

CalendarEdit.propTypes = {
  event: PropTypes.object,
};

export default CalendarEdit;
