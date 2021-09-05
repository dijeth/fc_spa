import React from 'react';
import PropTypes from 'prop-types';

const TouchTry = () => {
  const handler = (evt) => {
    console.log(evt.touches.length ? evt.touches[0].clientX : '');
  };

  return (
    <div
      style={{
        backgroundColor: 'red',
        width: '100%',
        height: '400px',
      }}
      onTouchStart={handler}
      onTouchMove={handler}
      onTouchEnd={handler}
    />
  );
};

TouchTry.propTypes = {};
TouchTry.defaultProps = {};

export default TouchTry;
