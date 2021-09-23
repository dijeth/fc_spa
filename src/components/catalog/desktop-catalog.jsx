import React from 'react';
import { getStaticUrl } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import AddressList from './address-list';
import Thrumbnails from './thrumbnails';
import MainPhoto from './main-photo';
import { ImageFolder } from '../../const';
import { catalogPropTypes } from '../../prop-types';

const DesktopCatalog = ({
  activeSection,
  activeLook,
  sectionList,
  addressList,
  logotype,
  validTime,
  onSlideChange,
  onSectionChange,
  brandRegExp,
}) => {
  const section = activeSection;
  const lookIndex = section.items[activeLook] ? activeLook : 0;
  const nextLookIndex = lookIndex + 1 <= section.items.length - 1 ? lookIndex + 1 : 0;
  const prevLookIndex = lookIndex - 1 >= 0 ? lookIndex - 1 : section.items.length - 1;

  const texts = section.items.map(({ items, id }) => ({ items, id }));

  const photos = section.items.map(({ id, look }, i) => ({
    id,
    src: getStaticUrl('img', ImageFolder.LOOK, look),
    alt: `Look ${i + 1}`,
  }));

  const thrumbnails = section.items.map(({ thrumbnail, id }, i) => ({
    id,
    src: getStaticUrl('img', ImageFolder.THRUMBNAIL, thrumbnail),
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
            <AddressList logotype={logotype} addressList={addressList} />
          </div>
          <div className="catalog__look look">
            <MainPhoto slideIndex={lookIndex} images={photos} zoomImageSrc={getStaticUrl('img', ImageFolder.ZOOM, section.items[lookIndex].zoom)} />
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
              sections={sectionList}
              onSectionChange={onSectionChange}
            />

            <LookInfo data={texts} slideIndex={lookIndex} brandRegExp={brandRegExp} />
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
