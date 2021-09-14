import React from 'react';
import PropTypes from 'prop-types';

const SimpleZoom = ({
  src, alt, onClose, isShowen,
}) => (
  <div className={`simple-zoom modal ${isShowen ? 'modal--showen' : ''}`}>
    <img className="simple-zoom__image" src={src} alt={alt} />
    <button type="button" className="modal__close" aria-label="Закрыть" onClick={onClose}>
      <span className="button-close" />
    </button>
  </div>
);

SimpleZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  isShowen: PropTypes.bool.isRequired,
};

SimpleZoom.defaultProps = {};

export default SimpleZoom;
