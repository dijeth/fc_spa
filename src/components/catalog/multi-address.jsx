import React from 'react';
import { multiBrandAddressBlockPropTypes } from '../../prop-types';
import { MultiAddressItem } from './multi-address-item';

const MultiAddress = function MultiAddress({ brands }) {
  return (
    <ul className="catalog__address-list">
      {brands.map(({
        name, addressList, nameHasGender, gender,
      }) => (
        <li key={`${name}-${gender}`}>
          <MultiAddressItem name={name} nameHasGender={nameHasGender} gender={gender} addressList={addressList} />
        </li>
      ))}
    </ul>
  );
};

MultiAddress.propTypes = {
  brands: multiBrandAddressBlockPropTypes.isRequired,
};

export { MultiAddress };
