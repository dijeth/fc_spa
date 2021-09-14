import React from 'react';
import PropTypes from 'prop-types';

const AddressList = ({ onClose, isShowen }) => (
  <div className={`catalog__address address-list modal ${isShowen ? 'modal--showen' : ''}`}>
    <ul>
      <li className="address-list__item">
        <a className="address-list__phone" href="+74959333382">+7 (495) 933 3382</a>
        <span className="address-list__base">Третьяковский проезд</span>
      </li>
      <li className="address-list__item">
        <a className="address-list__phone" href="+74952258894">+7 (495) 225 8894</a>
        <span className="address-list__base">«Барвиха Luxury Village»</span>
      </li>
      <li className="address-list__item">
        <a className="address-list__phone" href="+74959333032">+7 (495) 933 3032</a>
        <span className="address-list__base">Кутузовский проспект, 31</span>
      </li>
    </ul>
    <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">
      <span className="button-close" />
    </button>
  </div>
);

AddressList.propTypes = {
  onClose: PropTypes.func,
  isShowen: PropTypes.bool,
};

AddressList.defaultProps = {
  onClose: null,
  isShowen: false,
};

export default React.memo(AddressList);
