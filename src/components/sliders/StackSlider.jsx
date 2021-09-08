import React from 'react';
import PropTypes from 'prop-types';

const getSlides = (slideIndex, slides, preloadedSideSlidesCount) => {
  const min = slideIndex - preloadedSideSlidesCount >= 0 ? slideIndex - preloadedSideSlidesCount : 0;
  const max = slideIndex + preloadedSideSlidesCount < slides.length ? slideIndex + preloadedSideSlidesCount : slides.length - 1;

  return {
    leftSlides: slides.slice(min, slideIndex),
    currentSlide: slides[slideIndex],
    rightSlides: slides.slice(slideIndex + 1, max),
  };
};

const StackSlider = ({
  slideIndex,
  preloadedSideSlidesCount,
  className,
  children,
}) => {
  const [current, setCurrent] = React.useState(slideIndex);
  const refCurrent = React.useRef();

  const { leftSlides, currentSlide, rightSlides } = getSlides(current, children, preloadedSideSlidesCount);

  React.useEffect(() => {
    const opacityChangeHandler = (evt) => {
      evt.currentTarget.removeEventListener('transitionend', opacityChangeHandler);
      setCurrent(slideIndex);
    };

    if (current !== slideIndex) {
      refCurrent.current.addEventListener('transitionend', opacityChangeHandler);
    }
  });

  React.useEffect(() => {
    refCurrent.current.style.opacity = current !== slideIndex ? 0 : 1;
  });

  return (
    <div className={`stack-slider ${className || ''}`}>
      <div className="stack-slider__track">
        {leftSlides.map((it) => <div key={it.key} style={{ opacity: 0 }}>{it}</div>)}
        <div key={currentSlide.key} style={{ opacity: 0 }} ref={refCurrent}>{currentSlide}</div>
        {rightSlides.map((it) => <div key={it.key} style={{ opacity: 0 }}>{it}</div>)}
      </div>
    </div>
  );
};

StackSlider.propTypes = {
  slideIndex: PropTypes.number.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  preloadedSideSlidesCount: PropTypes.number,
  className: PropTypes.string,
};

StackSlider.defaultProps = {
  preloadedSideSlidesCount: 0,
  className: null,
};

export default StackSlider;
