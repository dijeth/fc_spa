import React from 'react';
import PropTypes from 'prop-types';

const SENSITIVITY = 25;

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

    if (itemIndex < 0) {
      return OutBoundComponent
        ? <OutBoundComponent key={`left-${slide.key}`}>{slide}</OutBoundComponent>
        : <div key={`left-${slide.key}`}>{slide}</div>;
    }

    if (itemIndex > slideElements.length - 1) {
      return OutBoundComponent
        ? <OutBoundComponent key={`right-${slide.key}`}>{slide}</OutBoundComponent>
        : <div key={`left-${slide.key}`}>{slide}</div>;
    }

    return slide;
  });

const getSlideIndex = (coordX, bounds, boundsPx, slideWidth, slideCount) => {
  const slideIndex = bounds.min + Math.ceil((coordX - boundsPx.min) / slideWidth) - 1;

  return correctSlideIndex(slideIndex, slideCount);
};

const getTouchPositionInPercent = (evt) => 100 * (evt.changedTouches[0].clientX / evt.currentTarget.parentNode.getBoundingClientRect().width);

const GallerySlider = ({
  targetPosition,
  showenSlidesCount,
  preloadedSideSlidesCount,
  OutBoundComponent,
  onSlideClick,
  onSlideChange,
  className,
  children,
}) => {
  const slideWidth = 100 / showenSlidesCount;
  const loadedSlidesCount = showenSlidesCount + 2 * preloadedSideSlidesCount;
  const animationClassName = 'gallery-slider__track--animation';
  const startPositionInPercent = -1 * (getSideSlides(loadedSlidesCount).left - getSideSlides(showenSlidesCount).left) * slideWidth;

  const refTrack = React.useRef();
  const [position, setPosition] = React.useState(targetPosition);
  const [positionInPercent, setPositionInPercent] = React.useState(startPositionInPercent);
  const [touchStart, setTouchStart] = React.useState();

  const bounds = getViewBounds(loadedSlidesCount, position);

  const targetPositionInPercent = positionInPercent - (targetPosition - position) * slideWidth;

  const clickHandler = (evt) => {
    const { left, right } = refTrack.current.getBoundingClientRect();
    const { width } = refTrack.current.parentNode.getBoundingClientRect();

    const slideWidthPx = (width / 100) * slideWidth;
    const slideIndex = getSlideIndex(evt.clientX, bounds, { min: left, max: right }, slideWidthPx, children.length);

    onSlideClick(slideIndex);
  };

  const touchStartHandler = (evt) => {
    setTouchStart({ track: positionInPercent, touch: getTouchPositionInPercent(evt) });
  };

  const touchEndHandler = (evt) => {
    let direction = (touchStart.touch > getTouchPositionInPercent(evt)) ? 1 : -1;

    if (Math.abs(touchStart.touch - getTouchPositionInPercent(evt)) < SENSITIVITY) {
      direction = 0;
    }

    setPositionInPercent(startPositionInPercent);

    if (onSlideChange) {
      onSlideChange(correctSlideIndex(position + direction, children.length));
    }
  };

  const touchMoveHandler = (evt) => {
    refTrack.current.style.left = `${touchStart.track + getTouchPositionInPercent(evt) - touchStart.touch}%`;
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

    element.style.left = `${targetPositionInPercent}%`;
  });

  return (
    <div className={`gallery-slider ${className || ''}`}>
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
  className: PropTypes.string,
};

GallerySlider.defaultProps = {
  preloadedSideSlidesCount: 0,
  OutBoundComponent: null,
  onSlideClick: null,
  onSlideChange: null,
  className: null,
};

export default GallerySlider;
