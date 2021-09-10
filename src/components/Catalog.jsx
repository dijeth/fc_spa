import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUrl } from '../utils';

const Catalog = ({ data, activeSection, activeLook }) => {
  const section = data.sections[activeSection] || data.sections[0];
  const lookIndex = section.items[activeLook] ? activeLook : 0;
  const nextLookIndex = lookIndex + 1 <= section.items.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : section.items.length - 1;
  const nextSectionIndex = activeSection + 1 <= data.sections.length - 1 ? activeSection + 1 : 0;
  const prevSectionIndex = activeSection - 1 > 0 ? activeSection - 1 : data.sections.length - 1;
  const look = section.items[lookIndex];

  const getRedirectUrl = (redirectSection, redirectLook) => (data.sections.length > 1
    ? getUrl(data.brandLink, data.link, redirectSection, redirectLook)
    : getUrl(data.brandLink, data.link, redirectLook));

  return (
    <>
      <h1>{`Каталог ${data.brand} / ${data.title}`}</h1>
      <p>{`Секция ${section.section}, look ${look.photo}`}</p>
      <Link to={getRedirectUrl(section.link, nextLookIndex)}>Next Look</Link>
      <br />
      <Link to={getRedirectUrl(section.link, prevLookIndex)}>Prev Look</Link>
      <br />
      <Link to={getRedirectUrl(data.sections[nextSectionIndex].link, lookIndex)}>Next Section</Link>
      <br />
      <Link to={getRedirectUrl(data.sections[prevSectionIndex].link, lookIndex)}>Prev Section</Link>
      <br />
    </>
  );
};

Catalog.propTypes = {
  data: PropTypes.object.isRequired,
  activeSection: PropTypes.number,
  activeLook: PropTypes.number,
};

Catalog.defaultProps = {
  activeSection: 0,
  activeLook: 0,
};

export default Catalog;
