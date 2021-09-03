import React from 'react';
import PropTypes from 'prop-types';

const correctBounds = (bounds, slidesCount) => ({
  min: bounds.min < 0 ? 0 : bounds.min,
  max: bounds.max > slidesCount - 1 ? slidesCount - 1 : bounds.max,
});

const getSideSlides = (showenSlidesCount) => {
  const left = Math.floor((showenSlidesCount - 1) / 2);
  const right = showenSlidesCount - 1 - left;

  return { left, right };
};

const getViewBounds = (showenSlidesCount, centerSlideIndex, slidesCount) => {
  const sideSlides = getSideSlides(showenSlidesCount);

  const min = centerSlideIndex - sideSlides.left;
  const max = centerSlideIndex + sideSlides.right;

  return correctBounds({ min, max }, slidesCount);
};

const getSlides = (slideElements, bounds) => slideElements.filter((it, i) => i >= bounds.min && i <= bounds.max);

const getSliderBounds = (sliderBounds, viewBounds) => {
  const distance = Math.max(viewBounds.min - sliderBounds.max, sliderBounds.min - viewBounds.max);

  return false// distance > (viewBounds.max - viewBounds.min + 1)
    ? viewBounds
    : {
      min: Math.min(sliderBounds.min, viewBounds.min),
      max: Math.max(sliderBounds.max, viewBounds.max),
    };
};

const Slider = ({ to, children, showenSlidesCount }) => {
  const slideWidth = 200;
  const slideHeight = 300;

  const refSlider = React.useRef();

  const [bounds, setBounds] = React.useState({
    min: Number.POSITIVE_INFINITY,
    max: Number.NEGATIVE_INFINITY,
  });

  const viewBounds = getViewBounds(showenSlidesCount, to, children.length);
  const sliderBounds = getSliderBounds(bounds, viewBounds);

  if (sliderBounds.min < bounds.min || sliderBounds.max > bounds.max) {
    setBounds(sliderBounds);
  }

  return (
    <>
      <div className="slider" style={{ width: `${showenSlidesCount * slideWidth}px`, height: `${slideHeight}px` }}>
        <div className="slider__track" style={{ left: `${-1 * (to - bounds.min - getSideSlides(showenSlidesCount).left) * slideWidth}px` }} ref={refSlider}>
          {getSlides(children, bounds)}
        </div>
      </div>
      <button type="button" onClick={() => setBounds({ min: bounds.min - 2, max: bounds.max })}>bounds</button>
    </>
  );
};

Slider.propTypes = {
  to: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showenSlidesCount: PropTypes.number.isRequired,
};

export default Slider;
