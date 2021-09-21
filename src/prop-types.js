import PropTypes from 'prop-types';

export const lookInfoPropTypes = PropTypes.arrayOf(
  PropTypes.shape({
    text: PropTypes.string.isRequired,
    plu: PropTypes.string,
    cost: PropTypes.number,
  }),
);

export const addressListPropTypes = {
  logotype: PropTypes.string,
  addressList: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
};

export const catalogPropTypes = {
  activeSection: PropTypes.object.isRequired,
  activeLook: PropTypes.number,
  sectionList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSlideChange: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  validTime: PropTypes.string,
  ...addressListPropTypes,
};
