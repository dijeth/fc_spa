import React from 'react';
import PropTypes from 'prop-types';

const ZoomImage = ({ src }) => <img style={{ position: 'fixed', left: 0, top: 0 }} src={src} alt="Увеличенное изображение" />;

ZoomImage.propTypes = {
  src: PropTypes.string.isRequired,
};

ZoomImage.defaultProps = {};

export default ZoomImage;
