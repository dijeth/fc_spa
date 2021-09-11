import React from 'react';
import PropTypes from 'prop-types';
import { getUrl } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import AddressList from './address-list';
import Thrumbnails from './thrumbnails';
import MainPhoto from './main-photo';

const Catalog = ({
  data, activeSection, activeLook, onChangeLocation,
}) => {
  const category = data.brandLink;
  const catalog = data.link;

  const section = data.sections[activeSection] || data.sections[0];
  const lookIndex = section.items[activeLook] ? activeLook : 0;
  const nextLookIndex = lookIndex + 1 <= section.items.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : section.items.length - 1;

  const getRedirectUrl = (redirectSection, redirectLook) => (data.sections.length > 1
    ? getUrl(category, catalog, redirectSection, redirectLook + 1)
    : getUrl(category, catalog, redirectLook + 1));

  const getImageUrl = (catalogSection, lookImage) => (data.sections.length > 1
    ? getUrl('img', category, catalog, catalogSection, lookImage)
    : getUrl('img', category, catalog, lookImage));

  const getThrumbnailUrl = (catalogSection, lookImage) => (data.sections.length > 1
    ? getUrl('img', 'thrumbnails', category, catalog, catalogSection, lookImage)
    : getUrl('img', 'thrumbnails', category, catalog, lookImage));

  const texts = section.items.map(({ items, id }) => ({ items, id }));
  const sections = data.sections.map(({ id, section: name, link }) => ({ id, name, link }));

  const photos = section.items.map(({ photo, id }, i) => ({
    id,
    src: getImageUrl(section.link, `${photo}.jpg`),
    alt: `Look ${i + 1}`,
  }));

  const thrumbnails = section.items.map(({ photo, id }, i) => ({
    id,
    src: getThrumbnailUrl(section.link, `${photo}.jpg`),
    alt: `Look ${i + 1}`,
  }));

  const prevLookButton = prevLookIndex !== null
    ? (
      <button type="button" className="look__nav look__nav--prev" onClick={() => { onChangeLocation(getRedirectUrl(section.link, prevLookIndex)); }}>
        {prevLookIndex + 1}
      </button>
    )
    : '';

  const nextLookButton = nextLookIndex !== null
    ? (
      <button type="button" className="look__nav look__nav--next" onClick={() => { onChangeLocation(getRedirectUrl(section.link, nextLookIndex)); }}>
        {nextLookIndex + 1}
      </button>
    )
    : '';

  return (
    <div className="wrapper">
      <div className="catalog">
        <section className="catalog__main">
          <div className="catalog__side">
            <img src="/img/blv.svg" alt="Логотип" className="catalog__logo" />
            <AddressList />
          </div>
          <div className="catalog__look look">
            <MainPhoto slideIndex={lookIndex} images={photos} />
            <div className="look__info">
              {prevLookButton}
              <span className="look__current">
                <b>{ lookIndex + 1}</b>
                /
                { section.items.length}
              </span>
              {nextLookButton}
            </div>
          </div>
          <div className="catalog__side side">
            <SectionList activeSection={section.link} sections={sections} category={category} catalog={catalog} onSectionChange={onChangeLocation} />
            <LookInfo data={texts} slideIndex={lookIndex} />
          </div>
        </section>
        <section className="catalog__nav slider-nav">
          <Thrumbnails
            images={thrumbnails}
            slideIndex={lookIndex}
            onSlideClick={(index) => { onChangeLocation(getRedirectUrl(section.link, index)); }}
            onSlideChange={(index) => { onChangeLocation(getRedirectUrl(section.link, index)); }}
          />
        </section>
        <footer className="catalog__footer">
          <p>Цены действительны до 01.01.2021</p>
        </footer>
      </div>
    </div>
  );
};

Catalog.propTypes = {
  data: PropTypes.object.isRequired,
  activeSection: PropTypes.number,
  activeLook: PropTypes.number,
  onChangeLocation: PropTypes.func,
};

Catalog.defaultProps = {
  activeSection: 0,
  activeLook: 0,
  onChangeLocation: null,
};

export default Catalog;
