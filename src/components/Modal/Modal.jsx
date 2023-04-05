import { useEffect } from 'react';
import React from 'react';
import { ModalBackdrop, ModalContent } from './Modal.styled';

const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return (
    <ModalBackdrop onClick={handleClick}>
      <ModalContent>
        <img src={image} alt="" />
      </ModalContent>
    </ModalBackdrop>
  );
};
export default Modal;
