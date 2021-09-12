import React from 'react';
import PropTypes from 'prop-types';
import { getUrl } from '../../utils/common-utils';

const SectionList = ({
  activeSection, sections, category, catalog, onSectionChange,
}) => (
  <ul className="section-list side__fixed">
    {sections.map((it) => (
      <li className="section-list__item" key={it.id}>
        <button
          type="button"
          onClick={() => { onSectionChange(getUrl(category, catalog, it.link, 1)); }}
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
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
  onSectionChange: PropTypes.func,
};

SectionList.defaultProps = {
  onSectionChange: null,
};

export default SectionList;
