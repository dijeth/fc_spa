import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const SectionList = ({
  activeSection, sections, onSectionChange, logotype,
}) => (
  <>
    {
      logotype
        ? <img src={logotype} alt="Логотип" className="catalog__logo" />
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
            {it.name.replace(/(\S)-(\S)/g, '$1\u2011$2')}
          </button>
        </li>
      ))}
      {/* <li className="section-list__item section-list__item--all" key={sections.map((it) => it.id).join('-')}>
        <Link to="/">Все каталоги</Link>
      </li> */}
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
