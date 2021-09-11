import PropTypes from 'prop-types';

export const lookInfoPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
    plu: PropTypes.string,
    cost: PropTypes.number,
  }),
);
