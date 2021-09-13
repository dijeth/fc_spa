import React from 'react';
import PropTypes from 'prop-types';

const SectionList = ({
  activeSection, sections, onSectionChange,
}) => (
  <ul className="section-list side__fixed">
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
};

SectionList.defaultProps = {
};

export default SectionList;
