import React from 'react';
import PropTypes from 'prop-types';

const SimpleZoom = ({ src, alt }) => (
  <div className="simple-zoom">
    <img className="simple-zoom__image" src={src} alt={alt} />
  </div>
);

SimpleZoom.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

SimpleZoom.defaultProps = {};

export default SimpleZoom;
