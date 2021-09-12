import React from 'react';
import PropTypes from 'prop-types';
import SimpleSlider from '../sliders/SimpleSlider';
import { ThrumbnailEmpty } from './thrumbnail-empty';

const MAX_SHOWEN_SLIDES_COUNT = 11;

const Thrumbnails = ({
  slideIndex, images, onSlideClick, onSlideChange,
}) => {
  const prevIndex = slideIndex - 1 >= 0 ? slideIndex - 1 : null;
  const nextIndex = slideIndex + 1 <= images.length - 1 ? slideIndex + 1 : null;
  const showenSlidesCount = Math.min((images.length * 2) - 1, MAX_SHOWEN_SLIDES_COUNT);

  return (
    <>
      <button
        type="button"
        className="slider-nav__button slider-nav__button--prev"
        onClick={() => { onSlideChange(prevIndex); }}
        disabled={prevIndex === null}
        aria-label="Предыдущий слайд"
      />

      <SimpleSlider
        targetPosition={slideIndex}
        showenSlidesCount={showenSlidesCount}
        onSlideClick={onSlideClick}
        className="slider-nav__list"
        OutBoundComponent={ThrumbnailEmpty}
      >
        {images.map((it) => <img className="slider-nav__slide" src={it.src} alt={it.alt} key={it.id} />)}
      </SimpleSlider>

      <button
        type="button"
        className="slider-nav__button slider-nav__button--next"
        onClick={() => { onSlideChange(nextIndex); }}
        disabled={nextIndex === null}
        aria-label="Следующий слайд"
      />
    </>
  );
};

Thrumbnails.propTypes = {
  slideIndex: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSlideClick: PropTypes.func,
  onSlideChange: PropTypes.func,
};

Thrumbnails.defaultProps = {
  onSlideClick: null,
  onSlideChange: null,
};

export default Thrumbnails;
