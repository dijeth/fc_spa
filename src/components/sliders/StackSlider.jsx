import React from 'react';
import PropTypes from 'prop-types';

const correctSlideIndex = (slideIndex, slidesCount) => {
  if (slideIndex < 0) {
    return 0;
  }

  if (slideIndex > slidesCount - 1) {
    return slidesCount - 1;
  }

  return slideIndex;
};

const StackSlider = ({
  slideIndex,
  preloadedSideSlidesCount,
  className,
  children,
}) => {
  const nextSlideIndex = correctSlideIndex(slideIndex);

  const [current, setCurrent] = React.useState(nextSlideIndex);
  const refCurrent = React.useRef();
  const refNext = React.useRef();
  const refSlider = React.useRef();

  const keyCurrent = children[current].key;
  const keyNext = children[slideIndex].key;

  const min = correctSlideIndex(current - preloadedSideSlidesCount, children.length);
  const max = correctSlideIndex(current + preloadedSideSlidesCount, children.length);

  const shouldChange = current !== nextSlideIndex;

  const renderChangeable = () => {
    const slides = children.slice(min, max + 1).map((it) => {
      switch (it.key) {
        case keyCurrent:
          return <div key={it.key} ref={refCurrent} style={{ opacity: 1 }}>{ it }</div>;

        case keyNext:
          return <div key={it.key} ref={refNext} style={{ opacity: 0 }}>{ it }</div>;

        default:
          return <div key={it.key} style={{ opacity: 0 }}>{ it }</div>;
      }
    });

    if (nextSlideIndex < min || nextSlideIndex > max) {
      const nextSlide = children[nextSlideIndex];
      slides.push(<div key={nextSlide.key} data-img={nextSlide.key} ref={refNext} style={{ opacity: 0 }}>{ nextSlide }</div>);
    }

    return slides;
  };

  const renderChanged = () => {
    const slides = children.slice(min, max + 1).map((it) => {
      switch (it.key) {
        case keyCurrent:
          return <div key={it.key} data-img={it.key} ref={refCurrent} style={{ opacity: 1, zIndex: 10 }}>{ it }</div>;

        default:
          return <div key={it.key} data-img={it.key} style={{ opacity: 0, zIndex: 1 }}>{ it }</div>;
      }
    });

    return slides;
  };

  React.useEffect(() => {
    if (shouldChange) {
      const opacityChangeHandler = (evt) => {
        evt.currentTarget.removeEventListener('transitionend', opacityChangeHandler);
        setCurrent(nextSlideIndex);
      };

      refCurrent.current.addEventListener('transitionend', opacityChangeHandler);
    }
  });

  React.useEffect(() => {
    if (shouldChange) {
      refCurrent.current.style.opacity = 0;
      refNext.current.style.opacity = 1;
    }
  });

  React.useLayoutEffect(() => {
    const sliderElement = refSlider.current;
    const currentElement = refCurrent.current;

    const sliderRect = sliderElement.getBoundingClientRect();
    const currentRect = currentElement.getBoundingClientRect();

    currentElement.style.height = `${Math.round(sliderRect.height - (currentRect.top - sliderRect.top))}px`;
    currentElement.style.overflow = 'auto';

    if (shouldChange) {
      const nextElement = refNext.current;
      const nextRect = nextElement.getBoundingClientRect();
      nextElement.style.height = `${Math.round(sliderRect.height - (nextRect.top - sliderRect.top))}px`;
      nextElement.style.overflow = 'auto';
    }
  });

  return (
    <div className={`stack-slider ${className || ''}`} ref={refSlider}>
      <div className="stack-slider__track">
        {shouldChange ? renderChangeable() : renderChanged()}
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
