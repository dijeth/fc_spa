import React from 'react';
import PropTypes from 'prop-types';
import { brandAddressDataPropTypes } from '../../prop-types';
import StackSlider from '../sliders/stack-slider';
import { PRELOADED_SLIDES_COUNT } from '../../const';
import { LookAddressList } from './look-address-list';

const LookAddressSlider = ({ slideIndex, data, isMultibrand }) => (
  <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT}>
    {data.map(({ id, brands }) => (
      <LookAddressList brands={brands} key={id} isMultibrand={isMultibrand} />
    ))}
  </StackSlider>
);

LookAddressSlider.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    brands: PropTypes.arrayOf(brandAddressDataPropTypes).isRequired,
  })).isRequired,
  slideIndex: PropTypes.number.isRequired,
  isMultibrand: PropTypes.bool.isRequired,
};

export { LookAddressSlider };
