import React from 'react';
import GallerySlider from './sliders/GallerySlider';
import StackSlider from './sliders/StackSlider';
import SimpleSlider from './sliders/SimpleSlider';
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
      <GallerySlider targetPosition={position} showenSlidesCount={1} preloadedSideSlidesCount={8} onSlideChange={(index) => { setPosition(index); }} OutBoundComponent={SliderEmptyItem} className="main-photo">
        {slides}
      </GallerySlider>

      <StackSlider slideIndex={position} preloadedSideSlidesCount={8} className="main-photo">
        {data.map((it) => <p style={{ width: '200px', textAlign: 'center' }} key={it.alt}>{it.alt}</p>)}
      </StackSlider>

      <SimpleSlider
        targetPosition={position}
        showenSlidesCount={7}
        OutBoundComponent={({ children }) => <div style={{ flexShrink: 0, opacity: 0.5 }}>{ children }</div>}
        onSlideClick={(index) => { setPosition(index); }}
        onSlideChange={(index) => { setPosition(index); }}
        className="nav-slider"
      >
        {data.map((it) => <img src={it.src} alt={it.alt} key={it.src} />)}
      </SimpleSlider>

      {/* <GallerySlider
        targetPosition={position}
        showenSlidesCount={5}
        preloadedSideSlidesCount={2}
        OutBoundComponent={SliderEmptyItem}
        onSlideClick={(index) => { setPosition(index); }}
        onSlideChange={(index) => { setPosition(index); }}
        className="nav-slider"
      >
        {slides}
      </GallerySlider> */}

      <button type="button" onClick={prevButtonClickHandler(20)}>Prev 20</button>
      <button type="button" onClick={prevButtonClickHandler(1)}>Prev</button>
      <button type="button" onClick={nextButtonClickHandler(1)}>Next</button>
      <button type="button" onClick={nextButtonClickHandler(20)}>Next 20</button>
    </>
  );
};

export default App;
