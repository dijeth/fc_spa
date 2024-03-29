import React from 'react';
import PropTypes from 'prop-types';
import { PRELOADED_SLIDES_COUNT } from '../../const/catalog-const';
import { lookPropTypes } from '../../prop-types';
import StackSlider from '../sliders/stack-slider';

const renderItemText = (itemData) => itemData.map((it) => (
  <p key={it.id} dangerouslySetInnerHTML={{ __html: it.html }} />
));

const renderItems = (data) => data.map((it) => (
  <div className="look-info" key={it.id}>
    <div className="look-info__text">
      {renderItemText(it.items)}
    </div>
  </div>
));

const LookInfo = ({ data, slideIndex }) => (
  <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT} className="look-info__slider side__growing">
    { renderItems(data) }
  </StackSlider>
);

LookInfo.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(lookPropTypes)).isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default LookInfo;
