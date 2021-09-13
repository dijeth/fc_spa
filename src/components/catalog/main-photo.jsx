import React from 'react';
import PropTypes from 'prop-types';
import StackSlider from '../sliders/stack-slider';
import { PRELOADED_SLIDES_COUNT } from '../../const';
import ZoomImage from './zoom-image';

const MainPhoto = ({ slideIndex, images, zoomImageSrc }) => (
  <ZoomImage src={zoomImageSrc}>
    <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT} className="look__photo">
      {images.map((it) => <img key={it.id} src={it.src} alt={it.alt} />)}
    </StackSlider>
  </ZoomImage>
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
  zoomImageSrc: PropTypes.string,
};

MainPhoto.defaultProps = {
  zoomImageSrc: null,
};

export default MainPhoto;
