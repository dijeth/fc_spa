import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
  isShowen, onClose, unMountWhenClosed, children,
}) => {
  const refMain = React.useRef();
  const [isMounted, setIsMounted] = React.useState();

  React.useEffect(() => {
    const element = refMain.current;

    const transitionEndHandler = () => {
      setIsMounted(false);
    };

    const transitionStartHandler = () => {
      setIsMounted(true);
    };

    if (!isShowen && unMountWhenClosed) {
      element.addEventListener('transitionend', transitionEndHandler);
    }

    if (isShowen && unMountWhenClosed) {
      element.addEventListener('transitionstart', transitionStartHandler);
    }

    return () => {
      if (unMountWhenClosed) {
        element.removeEventListener('transitionend', transitionEndHandler);
        element.removeEventListener('transitionstart', transitionStartHandler);
      }
    };
  }, [isShowen]);

  const content = !unMountWhenClosed || isMounted
    ? children
    : '';

  return (
    <div className={`modal ${isShowen ? 'modal--showen' : ''}`} ref={refMain}>
      <div className="modal__inner">
        {content}
      </div>
      {
        onClose
          ? (
            <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose}>
              Закрыть
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
