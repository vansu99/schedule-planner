import React from 'react';
import Modal from 'react-modal';
import useStyles from './style';

export default function ReactModal({ children, isOpen, handleCloseModal }) {
  const classes = useStyles();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      className={classes.modal}
      overlayClassName={classes.overlay}
    >
      {children}
    </Modal>
  );
}
