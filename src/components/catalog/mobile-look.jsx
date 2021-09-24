import React from 'react';
import PropTypes from 'prop-types';
import { PRELOADED_SLIDES_COUNT } from '../../const';
import GallerySlider from '../sliders/gallery-slider';
import { getImageSize } from '../../utils/common-utils';

const MobileLook = ({ lookIndex, images, onSlideChange }) => {
  const refLook = React.useRef();
  const [imageSize, setImageSize] = React.useState();

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

    getImageSize(images[0].src).then(({ width, height }) => {
      const imageHeight = lookWidth / (width / height);
      setImageSize({
        width: lookWidth,
        height: imageHeight,
      });
    });
  }, []);

  const lookStyle = imageSize ? { height: `${imageSize.height}px` } : { height: '70vw' };
  const imageStyle = imageSize ? { width: `${imageSize.width}px`, height: `${imageSize.height}px` } : {};

  return (
    <div className="look__photo-container" style={lookStyle} ref={refLook}>
      {
        imageSize
          ? (
            <GallerySlider
              targetPosition={lookIndex}
              showenSlidesCount={1}
              preloadedSideSlidesCount={Math.min(images.length - 1, PRELOADED_SLIDES_COUNT)}
              className="look__photo"
              onSlideChange={onSlideChange}
            >
              {images.map((it) => <div key={it.id} style={imageStyle}><img src={it.src} alt={it.alt} style={imageStyle} /></div>)}
            </GallerySlider>
          )
          : <div className="preloader preloader--image" />
    }
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
};

MobileLook.defaultProps = {};

export default MobileLook;
