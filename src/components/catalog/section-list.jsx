import React from 'react';
import PropTypes from 'prop-types';

const SectionList = ({
  activeSection, sections, onSectionChange, onClose, isShowen,
}) => (
  <div className={`section-list modal ${isShowen ? 'modal--showen' : ''}`}>
    <ul>
      {sections.map((it) => (
        <li className="section-list__item" key={it.id}>
          <button
            type="button"
            onClick={() => { onSectionChange(it.link); }}
            className={activeSection === it.link ? 'active' : ''}
          >
            {it.name}
          </button>
        </li>
      ))}
    </ul>
    <button className="modal__close" type="button" onClick={onClose} aria-label="Закрыть">
      <span className="button-close" />
    </button>
  </div>
);

SectionList.propTypes = {
  activeSection: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSectionChange: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  isShowen: PropTypes.bool,
};

SectionList.defaultProps = {
  onClose: null,
  isShowen: false,
};

export default SectionList;
