import React from 'react';
import PropTypes from 'prop-types';

const MobileThrumbnails = ({
  images, activeImage, onActiveImageChange, isShowen, onClose,
}) => (
  <div className={`modal ${isShowen ? 'modal--showen' : ''}`}>
    <div className="mobile-thrumbnails">
      <div className="mobile-thrumbnails__inner">
        {
          images.map(
            (it, i) => (
              <img
                src={it.src}
                alt={it.alt}
                key={it.id}
                className={`mobile-thrumbnails__image ${i === activeImage ? 'mobile-thrumbnails__image--active' : ''}`}
                onClick={() => { onActiveImageChange(i); }}
                aria-hidden="true"
              />
            ),
          )
        }
      </div>
    </div>
    <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">
      <span className="button-close" />
    </button>
  </div>
);

MobileThrumbnails.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  activeImage: PropTypes.number.isRequired,
  onActiveImageChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isShowen: PropTypes.bool,
};

MobileThrumbnails.defaultProps = {
  isShowen: false,
};

export default MobileThrumbnails;
