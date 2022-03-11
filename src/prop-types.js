import PropTypes from 'prop-types';
import { Gender } from './const';

const genderPropType = PropTypes.oneOf(Object.values(Gender));

const lookItemPropTypes = {
  text: PropTypes.string.isRequired,
  plu: PropTypes.string,
  cost: PropTypes.number,
  gender: genderPropType,
};

export const lookPropTypes = {
  id: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(lookItemPropTypes)),
  brands: PropTypes.arrayOf(PropTypes.string),
  gender: genderPropType,
};

const addressPropTypes = {
  phone: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const multiBrandAddressBlockPropTypes = {
  addresses: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    addressList: PropTypes.shape(addressPropTypes).isRequired,
  })).isRequired,
};

export const singleBrandAddressBlockPropTypes = {
  logotype: PropTypes.string,
  addressList: PropTypes.shape(addressPropTypes).isRequired,
};

export const addressListPropTypes = {
  logotype: PropTypes.string,
  addressList: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  })).isRequired,
};

const baseAddressPropTypes = {
  ...addressPropTypes,
  phoneMan: PropTypes.oneOfType([PropTypes.string, () => null]),
  phoneWoman: PropTypes.oneOfType([PropTypes.string, () => null]),
  phoneChild: PropTypes.oneOfType([PropTypes.string, () => null]),
};

const brandAddressPropTypes = {
  name: PropTypes.string.isRequired,
  addressList: PropTypes.arrayOf(PropTypes.shape(baseAddressPropTypes)).isRequired,
};

export const catalogPropTypes = {
  activeSection: PropTypes.object.isRequired,
  activeLook: PropTypes.number,
  sectionList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      gender: genderPropType.isRequired,
    }),
  ).isRequired,
  onSlideChange: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  validTime: PropTypes.string,
  isMultibrand: PropTypes.bool.isRequired,
  gender: genderPropType.isRequired,
  catalogBrands: PropTypes.arrayOf(PropTypes.shape(brandAddressPropTypes)).isRequired,
  logotype: PropTypes.string,
  addressList: PropTypes.arrayOf(PropTypes.shape(baseAddressPropTypes)).isRequired,
};
