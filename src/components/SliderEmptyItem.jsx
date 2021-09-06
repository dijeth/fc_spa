import React from 'react';
import PropTypes from 'prop-types';

const SliderEmptyItem = ({ children }) => (
  <div className="slider-empty-item">
    {children}
  </div>
);

SliderEmptyItem.propTypes = {
  children: PropTypes.element.isRequired,
};

export {
  SliderEmptyItem,
};
