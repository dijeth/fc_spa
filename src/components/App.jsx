import React from 'react';
import GallerySlider from './sliders/GallerySlider';
import { SliderItem } from './SliderItem';
import { SliderEmptyItem } from './SliderEmptyItem';

const App = ({ data }) => {
  const [position, setPosition] = React.useState(0);

  const prevButtonClickHandler = (step = 1) => () => {
    if (position - step >= 0) {
      setPosition(position - step);
    }
  };

  const nextButtonClickHandler = (step = 1) => () => {
    if (position + step <= data.length - 1) {
      setPosition(position + step);
    }
  };

  const slides = data.map((it) => <SliderItem src={it.src} alt={it.alt} key={it.src} />);

  return (
    <>
      {/* <GallerySlider targetPosition={position} showenSlidesCount={1} preloadedSideSlidesCount={4} onSlideChange={(index) => { setPosition(index); }} OutBoundComponent={SliderEmptyItem}>
        {slides}
      </GallerySlider>

      <GallerySlider targetPosition={position} showenSlidesCount={1} preloadedSideSlidesCount={1}>
        {data.map((it) => <p style={{ width: '200px', textAlign: 'center' }} key={it.alt}>{it.alt}</p>)}
      </GallerySlider> */}

      <GallerySlider
        targetPosition={position}
        showenSlidesCount={5}
        preloadedSideSlidesCount={2}
        OutBoundComponent={SliderEmptyItem}
        onSlideClick={(index) => { setPosition(index); }}
        onSlideChange={(index) => { setPosition(index); }}
        className="nav-slider"
      >
        {slides}
      </GallerySlider>

      <button type="button" onClick={prevButtonClickHandler(20)}>Prev 20</button>
      <button type="button" onClick={prevButtonClickHandler(1)}>Prev</button>
      <button type="button" onClick={nextButtonClickHandler(1)}>Next</button>
      <button type="button" onClick={nextButtonClickHandler(20)}>Next 20</button>
    </>
  );
};

export default App;
