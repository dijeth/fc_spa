import React from 'react';
import PropTypes from 'prop-types';
import { brandAddressDataPropTypes } from '../../prop-types';
import { PhoneList } from './phone-list';
import { GenderName } from '../../const';

const renderBrandName = (name, nameHasGender, gender, isMultibrand, isLookHasManyBrands) => {
  if (isMultibrand || isLookHasManyBrands) {
    return nameHasGender
      ? (
        <p className="catalog__address-brand">
          {name}
          <span className="catalog__address-gender">{`(${GenderName[gender]})`}</span>
        </p>
      )
      : (
        <p className="catalog__address-brand">
          {name}
        </p>
      );
  }

  return '';
};

const LookAddressList = function LookAddressList({ brands, isMultibrand }) {
  return (
    <ul className="catalog__address-list">
      {brands.map(({
        name, addressList, nameHasGender, gender,
      }) => (
        <li key={`${name}-${gender}`}>
          {renderBrandName(name, nameHasGender, gender, isMultibrand, brands.length > 1)}
          <PhoneList
            name={name}
            nameHasGender={nameHasGender}
            gender={gender}
            addressList={addressList}
          />
        </li>
      ))}
    </ul>
  );
};

LookAddressList.propTypes = {
  brands: PropTypes.arrayOf(brandAddressDataPropTypes).isRequired,
  isMultibrand: PropTypes.bool.isRequired,
};

export { LookAddressList };
