import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
import { useEffect, useState } from 'react';

export const Modal = ({currentLargeImageURL,onModalClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {


    const onModalClose = e => {
      setShowModal(false);
    };
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }
  };

  return (
    <div className={css.overlay} onClick={handleBackdrop}>
      <div>
        <img src={currentLargeImageURL} alt='' className={css.modal} />
      </div>
    </div>
 
  );
};

Modal.propTypes = {
  handleKeyDown: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
