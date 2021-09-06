import React from 'react';
import PropTypes from 'prop-types';

const getSideSlides = (slidesCount) => {
  const left = Math.floor((slidesCount - 1) / 2);
  const right = slidesCount - 1 - left;

  return { left, right };
};

const getViewBounds = (boundsSlidesCount, centerSlideIndex) => {
  const sideSlides = getSideSlides(boundsSlidesCount);

  const min = centerSlideIndex - sideSlides.left;
  const max = centerSlideIndex + sideSlides.right;

  return { min, max };
};

const correctSlideIndex = (slideIndex, slidesCount) => {
  if (slideIndex < 0) {
    return slidesCount + slideIndex;
  }

  if (slideIndex > slidesCount - 1) {
    return slideIndex - slidesCount;
  }

  return slideIndex;
};

const getSlides = (slideElements, bounds, OutBoundComponent) => Array(bounds.max - bounds.min + 1)
  .fill()
  .map((it, i) => {
    const itemIndex = bounds.min + i;
    const correctedItemIndex = correctSlideIndex(itemIndex, slideElements.length);
    const slide = slideElements[correctedItemIndex];

    if (itemIndex !== correctedItemIndex) {
      return OutBoundComponent
        ? <OutBoundComponent key={slide.key}>{slide}</OutBoundComponent>
        : slide;
    }

    return slide;
  });

const getSlideIndex = (coordX, bounds, boundsPx, slideWidth, slideCount) => {
  const slideIndex = bounds.min + Math.ceil((coordX - boundsPx.min) / slideWidth) - 1;

  return correctSlideIndex(slideIndex, slideCount);
};

const GallerySlider = ({
  targetPosition, showenSlidesCount, preloadedSideSlidesCount, OutBoundComponent, onSlideClick, onSlideChange, children,
}) => {
  const slideWidth = 200;
  const slideHeight = 300;
  const loadedSlidesCount = showenSlidesCount + 2 * preloadedSideSlidesCount;
  const animationClassName = 'gallery-slider__track--animation';
  const startPositionInPixels = -1 * (getSideSlides(loadedSlidesCount).left - getSideSlides(showenSlidesCount).left) * slideWidth;

  const refTrack = React.useRef();
  const [position, setPosition] = React.useState(targetPosition);
  const [positionInPixels, setPositionInPixels] = React.useState(startPositionInPixels);
  const [touchStart, setTouchStart] = React.useState();

  const bounds = getViewBounds(loadedSlidesCount, position);

  const targetPositionInPixels = positionInPixels - (targetPosition - position) * slideWidth;

  const clickHandler = (evt) => {
    const { left, right } = refTrack.current.getBoundingClientRect();
    const slideIndex = getSlideIndex(evt.clientX, bounds, { min: left, max: right }, slideWidth, children.length);
    onSlideClick(slideIndex);
  };

  const touchStartHandler = (evt) => {
    setTouchStart({ track: positionInPixels, touch: evt.touches[0].clientX });
  };

  const touchEndHandler = (evt) => {
    const direction = (touchStart.touch > evt.changedTouches[0].clientX) ? 1 : -1;

    setPositionInPixels(startPositionInPixels);

    if (position + direction !== correctSlideIndex(position + direction, children.length)) {
      return;
    }

    if (onSlideChange) {
      onSlideChange(position + direction);
    }
  };

  const touchMoveHandler = (evt) => {
    setPositionInPixels(touchStart.track + evt.touches[0].clientX - touchStart.touch);
  };

  React.useEffect(() => {
    const element = refTrack.current;

    const transitionendHandler = () => {
      element.classList.remove(animationClassName);
      setPosition(targetPosition);
    };

    element.addEventListener('transitionend', transitionendHandler);

    return () => {
      element.removeEventListener('transitionend', transitionendHandler);
    };
  });

  React.useLayoutEffect(() => {
    const element = refTrack.current;

    if (position !== targetPosition) {
      element.classList.add(animationClassName);
    }

    element.style.left = `${targetPositionInPixels}px`;
  });

  return (
    <div className="gallery-slider" style={{ width: `${showenSlidesCount * slideWidth}px`, height: `${slideHeight}px` }}>
      <div
        className="gallery-slider__track"
        onClick={onSlideClick ? clickHandler : null}
        onTouchStart={touchStartHandler}
        onTouchMove={touchMoveHandler}
        onTouchEnd={touchEndHandler}
        aria-hidden="true"
        ref={refTrack}
      >
        {getSlides(children, bounds, OutBoundComponent)}
      </div>
    </div>
  );
};

GallerySlider.propTypes = {
  targetPosition: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showenSlidesCount: PropTypes.number.isRequired,
  preloadedSideSlidesCount: PropTypes.number,
  OutBoundComponent: PropTypes.func,
  onSlideClick: PropTypes.func,
  onSlideChange: PropTypes.func,
};

GallerySlider.defaultProps = {
  preloadedSideSlidesCount: 0,
  OutBoundComponent: null,
  onSlideClick: null,
  onSlideChange: null,
};

export default GallerySlider;
