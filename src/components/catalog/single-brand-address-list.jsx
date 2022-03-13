import React from 'react';
import PropTypes from 'prop-types';
import { genderPropType, singleBrandAddressBlockPropTypes } from '../../prop-types';
import { GenderName } from '../../const';

const renderBrandName = (name, nameHasGender, gender) => (nameHasGender
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
  ));

const renderLogotype = (logotype) => <img src={logotype} alt="Логотип" className="catalog__logo" />;

const SingleBrandAddressList = function SingleBrandAddressList({
  logotype, addressList, name, nameHasGender, gender,
}) {
  return (
    <>
      {logotype ? renderLogotype(logotype) : ''}
      {gender ? renderBrandName(name, nameHasGender, gender) : ''}
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
    </>
  );
};

SingleBrandAddressList.propTypes = {
  addressList: singleBrandAddressBlockPropTypes.isRequired,
  logotype: PropTypes.string,
  name: PropTypes.string,
  nameHasGender: PropTypes.bool,
  gender: genderPropType,
};

SingleBrandAddressList.defaultProps = {
  logotype: null,
  name: '',
  nameHasGender: false,
  gender: null,
};

export default React.memo(SingleBrandAddressList);
