import React from 'react';
import { getStaticUrl } from '../../utils/common-utils';
import { addressListPropTypes } from '../../prop-types';

const AddressList = ({ logotype, addressList }) => (
  <>
    {
      logotype
        ? <img src={getStaticUrl('img', logotype)} alt="Логотип" className="catalog__logo" />
        : ''
    }
    <ul className="catalog__address address-list">
      {
        addressList.map((it) => (
          <li className="address-list__item" key={it.text}>
            <a className="address-list__phone" href={`tel:+${it.phone.replace(/\D+/, '')}`}>{it.phone}</a>
            <span className="address-list__base">{it.text}</span>
          </li>
        ))
      }
    </ul>
  </>
);

AddressList.propTypes = addressListPropTypes;

AddressList.defaultProps = {
  logotype: null,
};

export default React.memo(AddressList);
