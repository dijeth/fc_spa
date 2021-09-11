import React from 'react';
import PropTypes from 'prop-types';

const ThrumbnailEmpty = ({ children }) => (
  <div className="slider-nav__slide slider-nav__slide--empty">
    {children}
  </div>
);

ThrumbnailEmpty.propTypes = {
  children: PropTypes.element.isRequired,
};

export {
  ThrumbnailEmpty,
};
