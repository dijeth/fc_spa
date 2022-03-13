import React from 'react';
import { multiBrandAddressBlockPropTypes } from '../../prop-types';
import AddressList from './address-list';
import { GenderName } from '../../const';

const MultiAddressItem = function MultiAddressItem({
  name, nameHasGender, gender, addressList,
}) {
  const brandName = nameHasGender
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

  return (
    <>
      {brandName}
      <AddressList addressList={addressList} />
    </>
  );
};

MultiAddressItem.propTypes = multiBrandAddressBlockPropTypes.isRequired;

export { MultiAddressItem };
