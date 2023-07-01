import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';




export class Modal extends Component {

  static propTypes = {
    onModalClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.props.onKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onKeyDown);
  }

  handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };




  render() {
    const {  url, tag } = this.props;
    const {handleBackdrop} = this;

    return (
      <div className={css.overlay} onClick={handleBackdrop}>
        <div >
          <img src={url} alt={tag} className={css.modal} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onKeyDown: PropTypes.func.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

