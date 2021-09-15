import React from 'react';
import PropTypes from 'prop-types';

const MobileThrumbnails = ({ images, activeImage, onActiveImageChange }) => (
  <div className="mobile-thrumbnails">
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
};

MobileThrumbnails.defaultProps = {
};

export default MobileThrumbnails;
