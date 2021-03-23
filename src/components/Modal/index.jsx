import React from "react";
import Modal from "react-modal";
import "./modal.scss";

export default function ReactModal({ children, isOpen, handleCloseModal }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      {children}
    </Modal>
  );
}
