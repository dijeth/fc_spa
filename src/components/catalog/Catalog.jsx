import React from 'react';
import PropTypes from 'prop-types';
import { getUrl } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import AddressList from './address-list';
import Thrumbnails from './thrumbnails';
import MainPhoto from './main-photo';
import { ImageFolder } from '../../const';

const Catalog = ({
  data, activeSection, activeLook, onSlideChange, onSectionChange,
}) => {
  const section = data.sections[activeSection] || data.sections[0];
  const lookIndex = section.items[activeLook] ? activeLook : 0;
  const nextLookIndex = lookIndex + 1 <= section.items.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : section.items.length - 1;

  const texts = section.items.map(({ items, id }) => ({ items, id }));
  const sections = data.sections.map(({ id, section: name, link }) => ({ id, name, link }));

  const photos = section.items.map(({ id, look }, i) => ({
    id,
    src: getUrl('img', ImageFolder.LOOK, look),
    alt: `Look ${i + 1}`,
  }));

  const thrumbnails = section.items.map(({ thrumbnail, id }, i) => ({
    id,
    src: getUrl('img', ImageFolder.THRUMBNAIL, thrumbnail),
    alt: `Look ${i + 1}`,
  }));

  const prevLookButton = prevLookIndex !== null
    ? (
      <button type="button" className="look__nav look__nav--prev" onClick={() => { onSlideChange(prevLookIndex); }}>
        {prevLookIndex + 1}
      </button>
    )
    : '';

  const nextLookButton = nextLookIndex !== null
    ? (
      <button type="button" className="look__nav look__nav--next" onClick={() => { onSlideChange(nextLookIndex); }}>
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
            <MainPhoto slideIndex={lookIndex} images={photos} zoomImageSrc={getUrl('img', ImageFolder.ZOOM, section.items[lookIndex].zoom)} />
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
            <SectionList
              activeSection={section.link}
              sections={sections}
              onSectionChange={onSectionChange}
            />

            <LookInfo data={texts} slideIndex={lookIndex} />
          </div>
        </section>
        <section className="catalog__nav slider-nav">
          <Thrumbnails
            images={thrumbnails}
            slideIndex={lookIndex}
            onSlideClick={onSlideChange}
            onSlideChange={onSlideChange}
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
  onSlideChange: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};

Catalog.defaultProps = {
  activeSection: 0,
  activeLook: 0,
};

export default Catalog;
