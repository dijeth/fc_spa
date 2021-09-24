import React from 'react';
import PropTypes from 'prop-types';
import { PRELOADED_SLIDES_COUNT } from '../../const';
import GallerySlider from '../sliders/gallery-slider';

const MobileLook = ({
  lookIndex, images, imageSize, onSlideChange,
}) => {
  const refLook = React.useRef();
  const [size, setSize] = React.useState();

  const nextLookIndex = lookIndex + 1 <= images.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : images.length - 1;

  const prevLookButton = prevLookIndex !== null
    ? (
      <button type="button" className="look__mobile-nav look__mobile-nav--prev" onClick={() => { onSlideChange(prevLookIndex); }} aria-label={`Look ${prevLookIndex + 1}`} />
    )
    : '';

  const nextLookButton = nextLookIndex !== null
    ? (
      <button type="button" className="look__mobile-nav look__mobile-nav--next" onClick={() => { onSlideChange(nextLookIndex); }} aria-label={`Look ${nextLookIndex + 1}`} />
    )
    : '';

  React.useEffect(() => {
    const lookWidth = refLook.current.getBoundingClientRect().width;
    const imageHeight = lookWidth / (imageSize.width / imageSize.height);

    setSize({
      width: lookWidth,
      height: imageHeight,
    });
  }, []);

  const lookStyle = size ? { height: `${size.height}px` } : { height: '70vw' };
  const imageStyle = size ? { width: `${size.width}px`, height: `${size.height}px` } : {};

  return (
    <div className="look__photo-container" style={lookStyle} ref={refLook}>
      <GallerySlider
        targetPosition={lookIndex}
        showenSlidesCount={1}
        preloadedSideSlidesCount={Math.min(images.length - 1, PRELOADED_SLIDES_COUNT)}
        className="look__photo"
        onSlideChange={onSlideChange}
      >
        {images.map((it) => <div key={it.id} style={imageStyle}><img src={it.src} alt={it.alt} style={imageStyle} /></div>)}
      </GallerySlider>

      {prevLookButton}
      {nextLookButton}
    </div>
  );
};

MobileLook.propTypes = {
  lookIndex: PropTypes.number.isRequired,
  onSlideChange: PropTypes.func.isRequired,

  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  })).isRequired,

  imageSize: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

MobileLook.defaultProps = {};

export default MobileLook;
