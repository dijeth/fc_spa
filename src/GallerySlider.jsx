import React from 'react';
import PropTypes from 'prop-types';

const correctBounds = (bounds, slidesCount) => ({
  min: bounds.min < 0 ? 0 : bounds.min,
  max: bounds.max > slidesCount - 1 ? slidesCount - 1 : bounds.max,
});

const getSideSlides = (slidesCount) => {
  const left = Math.floor((slidesCount - 1) / 2);
  const right = slidesCount - 1 - left;

  return { left, right };
};

const getViewBounds = (boundsSlidesCount, centerSlideIndex, slidesCount) => {
  const sideSlides = getSideSlides(boundsSlidesCount);

  const min = centerSlideIndex - sideSlides.left;
  const max = centerSlideIndex + sideSlides.right;

  return correctBounds({ min, max }, slidesCount);
};

const getSlides = (slideElements, bounds) => slideElements.filter((it, i) => i >= bounds.min && i <= bounds.max);

const GallerySlider = ({ to, children, showenSlidesCount }) => {
  const slideWidth = 200;
  const slideHeight = 300;
  const loadSlidesCount = Math.max(2 * showenSlidesCount - 1, 3);
  const animationClassName = 'slider__track--animation';

  const refSlider = React.useRef();
  const [position, setPosition] = React.useState(to);

  const bounds = getViewBounds(loadSlidesCount, position, children.length);

  const positionPx = -1 * (getSideSlides(loadSlidesCount).left - getSideSlides(showenSlidesCount).left) * slideWidth;
  const toPx = -1 * (getSideSlides(loadSlidesCount).left - getSideSlides(showenSlidesCount).left + to - position) * slideWidth;

  React.useEffect(() => {
    const transitionendHandler = () => {
      refSlider.current.classList.remove(animationClassName);
      setPosition(to);
    };

    refSlider.current.addEventListener('transitionend', transitionendHandler);

    return () => {
      refSlider.current.removeEventListener('transitionend', transitionendHandler);
    };
  });

  React.useLayoutEffect(() => {
    const element = refSlider.current;

    element.style.left = `${toPx}px`;
    if (position !== to) {
      element.classList.add(animationClassName);
    }
  });

  return (
    <>
      <div className="slider" style={{ width: `${showenSlidesCount * slideWidth}px`, height: `${slideHeight}px` }}>
        <div className="slider__track" style={{ left: `${positionPx}px` }} ref={refSlider}>
          {getSlides(children, bounds)}
        </div>
      </div>
    </>
  );
};

GallerySlider.propTypes = {
  to: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  showenSlidesCount: PropTypes.number.isRequired,
};

export default GallerySlider;
