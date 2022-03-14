import React from 'react';
import { getImageSize } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import { PreloaderReason } from '../../const';
import MobileLook from './mobile-look';
import MobileThrumbnails from './mobile-thrumbnails';
import SimpleZoom from './simple-zoom';
import Modal from '../modal';
import { catalogPropTypes } from '../../prop-types';
import PagePreloader from '../pages/page-preloader';
import { lookBrandsFormatter } from '../../utils';
import { LookAddressList } from './look-address-list';

const MobileCatalog = ({
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
  const [addressShowen, setAddressShowen] = React.useState(false);
  const [sectionsShowen, setSectionsShowen] = React.useState(false);
  const [navShowen, setNavShowen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  const [imageSize, setImageSize] = React.useState();

  const section = activeSection;
  const lookIndex = section.looks[activeLook] ? activeLook : 0;

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

  const looksAddressData = section.looks.map((look) => lookBrandsFormatter(look, catalogBrands));

  const renderLogotype = (logo) => <img src={logo} alt="Логотип" className="catalog__logo" />;

  React.useEffect(() => {
    const { look } = section.looks[activeLook];
    getImageSize(look)
      .then((size) => {
        setImageSize(size);
      });
  }, [activeSection]);

  if (!imageSize) {
    return <PagePreloader reason={PreloaderReason.IMAGE} />;
  }

  return (
    <div className="wrapper">
      <div className="catalog">
        <Modal isShowen={zoom} onClose={() => { setZoom(false); }} unMountWhenClosed>
          <SimpleZoom
            src={section.looks[lookIndex].zoom}
            alt={`Look ${lookIndex + 1}`}
          />
        </Modal>

        <Modal onClose={() => { setAddressShowen(false); }} isShowen={addressShowen}>
          <>
            {isMultibrand ? '' : renderLogotype(logotype)}
            <LookAddressList brands={looksAddressData[lookIndex].brands} isMultibrand={isMultibrand} />
          </>
        </Modal>

        <Modal onClose={() => { setSectionsShowen(false); }} isShowen={sectionsShowen}>
          <SectionList
            activeSection={section.link}
            sections={sectionList}
            onSectionChange={onSectionChange}
            logotype={logotype}
          />
        </Modal>

        <Modal isShowen={navShowen} onClose={() => { setNavShowen(false); }}>
          <MobileThrumbnails
            images={thrumbnails}
            activeImage={lookIndex}
            onActiveImageChange={(index) => {
              onSlideChange(index);
              setNavShowen(false);
            }}
          />
        </Modal>

        <button className="catalog__control catalog__control--menu" type="button" onClick={() => { setSectionsShowen(true); }} aria-label="Меню" />
        <button className="catalog__control catalog__control--nav" type="button" onClick={() => { setNavShowen(true); }} aria-label="Показать миниатюры" />
        <button className="catalog__control catalog__control--zoom" type="button" onClick={() => { setZoom(true); }} aria-label="Зум" />

        <section className="catalog__main">
          <div className="catalog__look look">
            <MobileLook lookIndex={lookIndex} images={photos} imageSize={imageSize} onSlideChange={onSlideChange} />

            <div className="look__controls">
              <button type="button" className="look__action" onClick={() => { setAddressShowen(true); }}>Заказать примерку</button>
            </div>

            <LookInfo data={texts} slideIndex={lookIndex} />

            <div className="look__info">
              <span className="look__current">
                <b>{ lookIndex + 1}</b>
                /
                { photos.length}
              </span>
            </div>
          </div>
        </section>
        <footer className="catalog__footer">
          <p>{validTime}</p>
        </footer>
      </div>
    </div>
  );
};

MobileCatalog.propTypes = catalogPropTypes;

MobileCatalog.defaultProps = {
  activeLook: 0,
  validTime: '',
};

export default MobileCatalog;
