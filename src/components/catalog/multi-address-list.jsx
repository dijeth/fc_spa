import React from 'react';
import PropTypes from 'prop-types';
import { multiBrandAddressBlockPropTypes } from '../../prop-types';
import StackSlider from '../sliders/stack-slider';
import { PRELOADED_SLIDES_COUNT } from '../../const';
import { MultiAddress } from './multi-address';

const MultiAddressList = ({ slideIndex, data }) => (
  <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT}>
    {data.map(({ id, brands }) => (
      <MultiAddress id={id} brands={brands} key={id} />
    ))}
  </StackSlider>
);

MultiAddressList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    brands: multiBrandAddressBlockPropTypes.isRequired,
  })).isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default MultiAddressList;
