import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isShowen, onClose, children }) => (
  <div className={`modal ${isShowen ? 'modal--showen' : ''}`}>
    <div className="modal__inner">
      {children}
    </div>
    {
      onClose
        ? (
          <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose}>
            <span className="button-close" />
          </button>
        )
        : ''
    }
  </div>
);

Modal.propTypes = {
  isShowen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Modal.defaultProps = {
  onClose: null,
};

export default Modal;
