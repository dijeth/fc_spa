import React from 'react';
import PropTypes from 'prop-types';

const SliderItem = ({ src, alt }) => {
  return (
    <div className="slider-item">
      <img src={src} alt={alt} />
    </div>
  );
};

SliderItem.propTypes = {};
SliderItem.defaultProps = {};

export {
  SliderItem,
};
