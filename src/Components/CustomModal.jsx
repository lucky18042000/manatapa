import React from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onClose, children }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      position: "absolute",
      padding: '0px',
      borderRadius: '20px',
      border:'0px'
    },
    overlay: {
      position: "fixed",
      background: "rgba(0,0,0,0.6)",
      zIndex: "99999",
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
  );
};

export default CustomModal;
