import React from 'react';
import PropTypes from 'prop-types';
import { getStaticUrl } from '../../utils/common-utils';

const SectionList = ({
  activeSection, sections, onSectionChange, logotype,
}) => (
  <>
    {
      logotype
        ? <img src={getStaticUrl('img', 'blv.svg')} alt="Логотип" className="catalog__logo" />
        : ''
    }

    <ul className="section-list">
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
  </>
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
  logotype: PropTypes.string,
};

SectionList.defaultProps = {
  logotype: null,
};

export default SectionList;
