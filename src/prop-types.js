import PropTypes from 'prop-types';
import { Gender } from './const';

export const genderPropType = PropTypes.oneOf(Object.values(Gender));

const lookItemPropTypes = {
  text: PropTypes.string.isRequired,
  plu: PropTypes.string,
  cost: PropTypes.number,
  gender: genderPropType,
};

export const lookPropTypes = {
  id: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape(lookItemPropTypes)),
  brands: PropTypes.arrayOf(PropTypes.shape({
    brand: PropTypes.string.isRequired,
    genders: PropTypes.arrayOf(genderPropType).isRequired,
  })).isRequired,
  gender: genderPropType,
};

export const addressPropTypes = {
  phone: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export const brandAddressDataPropTypes = PropTypes.shape({
  name: PropTypes.string.isRequired,
  nameHasGender: PropTypes.bool.isRequired,
  gender: genderPropType.isRequired,
  addressList: PropTypes.arrayOf(PropTypes.shape(addressPropTypes)).isRequired,
});

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
    }),
  ).isRequired,
  onSlideChange: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
  validTime: PropTypes.string,
  isMultibrand: PropTypes.bool.isRequired,
  catalogBrands: PropTypes.arrayOf(PropTypes.shape(brandAddressPropTypes)).isRequired,
  logotype: PropTypes.string,
};
