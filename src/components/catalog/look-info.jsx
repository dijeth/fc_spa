import React from 'react';
import PropTypes from 'prop-types';
import { ContentType, PRELOADED_SLIDES_COUNT } from '../../const/catalog-const';
import { lookInfoPropTypes } from '../../prop-types';
import { formatCost, splitContent } from '../../utils/catalog-utils';
import StackSlider from '../sliders/stack-slider';

const formatText = (text, brandRegExp) => splitContent(text, brandRegExp)
  .map((it) => (it.style === ContentType.TEXT
    ? it.content
    : (
      <span key={it.content} className={`look-info__${it.style}`}>
        { it.content }
      </span>
    )));

const renderItemText = (itemData, brandRegExp) => itemData.map((it) => (
  <p key={it.id}>
    {formatText(`${it.text} ${formatCost(it.cost)}`, brandRegExp)}
  </p>
));

const renderItems = (data, brandRegExp) => data.map((it) => (
  <div className="look-info" key={it.id}>
    <div className="look-info__text">
      {renderItemText(it.items, brandRegExp)}
    </div>
  </div>
));

const LookInfo = ({ data, brandRegExp, slideIndex }) => (
  <StackSlider slideIndex={slideIndex} preloadedSideSlidesCount={PRELOADED_SLIDES_COUNT} className="look-info__slider side__growing">
    { renderItems(data, brandRegExp) }
  </StackSlider>
);

LookInfo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      items: lookInfoPropTypes.isRequired,
    }),
  ).isRequired,
  brandRegExp: PropTypes.instanceOf(RegExp).isRequired,
  slideIndex: PropTypes.number.isRequired,
};

export default LookInfo;
