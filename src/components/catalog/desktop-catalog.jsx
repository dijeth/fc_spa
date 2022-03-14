import React from 'react';
import LookInfo from './look-info';
import SectionList from './section-list';
import Thrumbnails from './thrumbnails';
import MainPhoto from './main-photo';
import { catalogPropTypes } from '../../prop-types';
import { lookBrandsFormatter } from '../../utils';
import { LookAddressSlider } from './look-address-slider';

const DesktopCatalog = ({
  activeSection,
  activeLook,
  sectionList,
  logotype,
  validTime,
  isMultibrand,
  catalogBrands,
  onSlideChange,
  onSectionChange,
}) => {
  const section = activeSection;
  const lookIndex = section.looks[activeLook] ? activeLook : 0;
  const nextLookIndex = lookIndex + 1 <= section.looks.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : section.looks.length - 1;

  const texts = section.looks.map(({
    items, id, brands,
  }) => ({
    items, id, brands,
  }));

  const photos = section.looks.map(({ id, look }, i) => ({
    id,
    src: look,
    alt: `Look ${i + 1}`,
  }));

  const thrumbnails = section.looks.map(({ thrumbnail, id }, i) => ({
    id,
    src: thrumbnail,
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

  const looksAddressData = section.looks.map((look) => lookBrandsFormatter(look, catalogBrands));

  const renderLogotype = (logo) => <img src={logo} alt="Логотип" className="catalog__logo" />;

  return (
    <div className="wrapper">
      <div className="catalog">
        <section className="catalog__main">
          <div className="catalog__side">
            {isMultibrand ? '' : renderLogotype(logotype)}
            <LookAddressSlider slideIndex={lookIndex} data={looksAddressData} isMultibrand={isMultibrand} />
          </div>
          <div className="catalog__look look">
            <MainPhoto slideIndex={lookIndex} images={photos} zoomImageSrc={section.looks[lookIndex].zoom} />
            <div className="look__info">
              {prevLookButton}
              <span className="look__current">
                <b>{ lookIndex + 1}</b>
                /
                { section.looks.length}
              </span>
              {nextLookButton}
            </div>
          </div>
          <div className="catalog__side side">
            <SectionList
              activeSection={section.link}
              sections={sectionList}
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
          <p>{validTime}</p>
        </footer>
      </div>
    </div>
  );
};

DesktopCatalog.propTypes = catalogPropTypes;

DesktopCatalog.defaultProps = {
  activeLook: 0,
  validTime: '',
};

export default DesktopCatalog;
