import React from 'react';
import PropTypes from 'prop-types';

const getSideSlides = (slidesCount) => {
  const left = Math.floor((slidesCount - 1) / 2);
  const right = slidesCount - 1 - left;

  return { left, right };
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
        ? <OutBoundComponent key={`out-${slide.key}`}>{slide}</OutBoundComponent>
        : slide;
    }

    return slide;
  });

const getSlideIndex = (coordX, bounds, boundsPx, slideWidth, slideCount) => {
  const slideIndex = bounds.min + Math.ceil((coordX - boundsPx.min) / slideWidth) - 1;

  return correctSlideIndex(slideIndex, slideCount);
};

const SimpleSlider = ({
  targetPosition,
  showenSlidesCount,
  OutBoundComponent,
  onSlideClick,
  className,
  children,
}) => {
  const slideWidth = 100 / showenSlidesCount;
  const { left: leftSlidesCount, right: rightSlidesCount } = getSideSlides(showenSlidesCount);
  const bounds = { min: -leftSlidesCount, max: children.length - 1 + rightSlidesCount };

  const refTrack = React.useRef();

  const clickHandler = (evt) => {
    const { left, right } = refTrack.current.getBoundingClientRect();
    const { width } = refTrack.current.parentNode.getBoundingClientRect();

    const slideWidthPx = (width / 100) * slideWidth;
    const slideIndex = getSlideIndex(evt.clientX, bounds, { min: left, max: right }, slideWidthPx, children.length);

    onSlideClick(slideIndex);
  };

  return (
    <div className={`gallery-slider ${className || ''}`}>
      <div
        className="gallery-slider__track gallery-slider__track--animation"
        style={{ left: `${-targetPosition * slideWidth}%` }}
        onClick={clickHandler}
        aria-hidden="true"
        ref={refTrack}
      >
        {getSlides(children, bounds, OutBoundComponent)}
      </div>
    </div>
  );
};

SimpleSlider.propTypes = {
  targetPosition: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showenSlidesCount: PropTypes.number.isRequired,
  OutBoundComponent: PropTypes.func,
  onSlideClick: PropTypes.func,
  className: PropTypes.string,
};

SimpleSlider.defaultProps = {
  OutBoundComponent: null,
  onSlideClick: null,
  className: null,
};

export default SimpleSlider;
