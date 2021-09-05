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
  to, children, showenSlidesCount, preloadedSideSlidesCount, OutBoundComponent, onSlideClick,
}) => {
  const slideWidth = 200;
  const slideHeight = 300;
  const loadedSlidesCount = showenSlidesCount + 2 * preloadedSideSlidesCount;
  const animationClassName = 'slider__track--animation';

  const refTrack = React.useRef();
  const [position, setPosition] = React.useState(to);

  const bounds = getViewBounds(loadedSlidesCount, position);

  const positionPx = -1 * (getSideSlides(loadedSlidesCount).left - getSideSlides(showenSlidesCount).left) * slideWidth;
  const toPx = positionPx - (to - position) * slideWidth;

  const clickHandler = (evt) => {
    const { left, right } = refTrack.current.getBoundingClientRect();
    const slideIndex = getSlideIndex(evt.clientX, bounds, { min: left, max: right }, slideWidth, children.length);
    onSlideClick(slideIndex);
  };

  React.useEffect(() => {
    const element = refTrack.current;

    const transitionendHandler = () => {
      element.classList.remove(animationClassName);
      setPosition(to);
    };

    element.addEventListener('transitionend', transitionendHandler);

    return () => {
      element.removeEventListener('transitionend', transitionendHandler);
    };
  });

  React.useLayoutEffect(() => {
    const element = refTrack.current;

    if (position !== to) {
      element.classList.add(animationClassName);
    }

    element.style.left = `${toPx}px`;
  });

  return (
    <div className="slider" style={{ width: `${showenSlidesCount * slideWidth}px`, height: `${slideHeight}px` }}>
      <div className="slider__track" onClick={onSlideClick ? clickHandler : null} ref={refTrack}>
        {getSlides(children, bounds, OutBoundComponent)}
      </div>
    </div>
  );
};

GallerySlider.propTypes = {
  to: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showenSlidesCount: PropTypes.number.isRequired,
  preloadedSideSlidesCount: PropTypes.number,
  OutBoundComponent: PropTypes.func,
  onSlideClick: PropTypes.func,
};

GallerySlider.defaultProps = {
  preloadedSideSlidesCount: 0,
  OutBoundComponent: null,
  onSlideClick: null,
};

export default GallerySlider;
