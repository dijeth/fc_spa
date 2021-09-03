import React from 'react';
import Slider from './Slider';
import { SliderItem } from './SliderItem';

const App = ({ data }) => {
  const [position, setPosition] = React.useState(20);

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
      {/* <Slider to={position} showenSlidesCount={1}>
        {slides}
      </Slider> */}

      <Slider to={position} showenSlidesCount={5}>
        {slides}
      </Slider>

      <button type="button" onClick={prevButtonClickHandler(20)}>Prev 20</button>
      <button type="button" onClick={prevButtonClickHandler(1)}>Prev</button>
      <button type="button" onClick={nextButtonClickHandler(1)}>Next</button>
      <button type="button" onClick={nextButtonClickHandler(20)}>Next 20</button>
    </>
  );
};

export default App;
