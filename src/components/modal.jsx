import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isShowen, onClose, children }) => (
  <div className={`modal ${isShowen ? 'modal--showen' : ''}`}>
    <div className="modal__inner">
      {children}
    </div>
    <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose}>
      <span className="button-close" />
    </button>
  </div>
);

Modal.propTypes = {
  isShowen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Modal.defaultProps = {};

export default Modal;
