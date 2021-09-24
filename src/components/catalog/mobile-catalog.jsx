import React from 'react';
import { getStaticUrl } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import AddressList from './address-list';
import { ImageFolder } from '../../const';
import MobileLook from './mobile-look';
import MobileThrumbnails from './mobile-thrumbnails';
import SimpleZoom from './simple-zoom';
import Modal from '../modal';
import { catalogPropTypes } from '../../prop-types';

const MobileCatalog = ({
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
  const [addressShowen, setAddressShowen] = React.useState(false);
  const [sectionsShowen, setSectionsShowen] = React.useState(false);
  const [navShowen, setNavShowen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  const section = activeSection;
  const lookIndex = section.items[activeLook] ? activeLook : 0;

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

  return (
    <div className="wrapper">
      <div className="catalog">
        <Modal isShowen={zoom} onClose={() => { setZoom(false); }} unMountWhenClosed>
          <SimpleZoom
            src={getStaticUrl('img', ImageFolder.ZOOM, section.items[lookIndex].zoom)}
            alt={`Look ${lookIndex + 1}`}
          />
        </Modal>

        <Modal onClose={() => { setAddressShowen(false); }} isShowen={addressShowen}>
          <AddressList logotype={logotype} addressList={addressList} />
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
            <MobileLook lookIndex={lookIndex} images={photos} onSlideChange={onSlideChange} />

            <div className="look__controls">
              <button type="button" className="look__action" onClick={() => { setAddressShowen(true); }}>Заказать примерку</button>
            </div>

            <LookInfo data={texts} slideIndex={lookIndex} brandRegExp={brandRegExp} />

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
