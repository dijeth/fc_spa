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

const GallerySlider = ({ to, children, showenSlidesCount, name }) => {
  const slideWidth = 200;
  const slideHeight = 300;
  const loadSlidesCount = Math.max(2 * showenSlidesCount - 1, 3);
  const animationClassName = 'slider__track--animation';

  const refSlider = React.useRef();
  const [bounds, setBounds] = React.useState(getViewBounds(loadSlidesCount, to, children.length));
  const [reBound, setReBound] = React.useState(false);

  const trackLeftStyle = `${-1 * (to - bounds.min - getSideSlides(showenSlidesCount).left) * slideWidth}px`;

  if (reBound) {
    setBounds(getViewBounds(loadSlidesCount, to, children.length));
    setReBound(false);
  }

  React.useEffect(() => {
    refSlider.current.addEventListener('transitionend', () => {
      refSlider.current.classList.remove(animationClassName);
      setReBound(true);
    });
  }, [1]);

  React.useEffect(() => {
    const element = refSlider.current;
    // getComputedStyle(element).left;
    if (!reBound) {
      console.log(name + ': ' + getComputedStyle(element).left);
      element.classList.add(animationClassName);
      element.style.left = trackLeftStyle;
    }
  });

  return (
    <>
      <div className="slider" style={{ width: `${showenSlidesCount * slideWidth}px`, height: `${slideHeight}px` }}>
        <div className="slider__track" style={{ left: trackLeftStyle }} ref={refSlider}>
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
