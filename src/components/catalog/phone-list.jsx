import React from 'react';
import PropTypes from 'prop-types';
import { addressPropTypes } from '../../prop-types';

const PhoneList = function PhoneList({ addressList }) {
  return (
    <ul className="catalog__address address-list">
      {
        addressList.map((it) => (
          <li className="address-list__item" key={it.text}>
            <a className="address-list__phone" href={`tel:+${it.phone.replace(/\D+/, '')}`}>
              {it.phone.replace(/\+7(\d\d\d)(\d\d\d)(\d\d\d\d)/, '+7 ($1) $2 $3')}
            </a>
            <span className="address-list__base">{it.text}</span>
          </li>
        ))
      }
    </ul>
  );
};

PhoneList.propTypes = {
  addressList: PropTypes.arrayOf(PropTypes.shape(addressPropTypes)).isRequired,
};

export { PhoneList };
