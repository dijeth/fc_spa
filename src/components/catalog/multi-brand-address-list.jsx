import React from 'react';
import { multiBrandAddressBlockPropTypes } from '../../prop-types';
import SingleBrandAddressList from './single-brand-address-list';

const MultiBrandAddressList = function MultiBrandAddressList({ brands }) {
  return (
    <ul className="catalog__address-list">
      {brands.map(({
        name, addressList, nameHasGender, gender,
      }) => (
        <li key={`${name}-${gender}`}>
          <SingleBrandAddressList name={name} nameHasGender={nameHasGender} gender={gender} addressList={addressList} />
        </li>
      ))}
    </ul>
  );
};

MultiBrandAddressList.propTypes = {
  brands: multiBrandAddressBlockPropTypes.isRequired,
};

export { MultiBrandAddressList };
