import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  isShowen, onClose, unMountWhenClosed, children,
}) => {
  const content = !isShowen && unMountWhenClosed
    ? ''
    : (
      <div className="modal__inner">
        {children}
      </div>
    );

  return (
    <div className={`modal ${isShowen ? 'modal--showen' : ''}`}>
      {content}
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
};

Modal.propTypes = {
  isShowen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  unMountWhenClosed: PropTypes.bool,
};

Modal.defaultProps = {
  onClose: null,
  unMountWhenClosed: false,
};

export default Modal;
