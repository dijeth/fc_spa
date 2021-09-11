import React from 'react';
import PropTypes from 'prop-types';
import StackSlider from '../sliders/StackSlider';
import { PRELOADED_SLIDES_COUNT } from '../../const';

const MainPhoto = ({ slideIndex, images }) => (
  // <div className="look__photo">
  <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT} className="look__photo">
    {images.map((it) => <img key={it.id} src={it.src} alt={it.alt} />)}
  </StackSlider>
  // </div>
);

MainPhoto.propTypes = {
  slideIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

MainPhoto.defaultProps = {
};

export default MainPhoto;
