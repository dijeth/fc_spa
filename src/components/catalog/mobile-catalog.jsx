import React from 'react';
import PropTypes from 'prop-types';
import { getStaticUrl } from '../../utils/common-utils';
import LookInfo from './look-info';
import SectionList from './section-list';
import AddressList from './address-list';
import { ImageFolder } from '../../const';
import MobileLook from './mobile-look';
import MobileThrumbnails from './mobile-thrumbnails';
import SimpleZoom from './simple-zoom';
import Modal from '../modal';

const MobileCatalog = ({
  data, activeSection, activeLook, onSlideChange, onSectionChange,
}) => {
  const [addressShowen, setAddressShowen] = React.useState(false);
  const [sectionsShowen, setSectionsShowen] = React.useState(false);
  const [navShowen, setNavShowen] = React.useState(false);
  const [zoom, setZoom] = React.useState(false);

  const section = data.sections[activeSection] || data.sections[0];
  const lookIndex = section.items[activeLook] ? activeLook : 0;

  const texts = section.items.map(({ items, id }) => ({ items, id }));
  const sections = data.sections.map(({ id, section: name, link }) => ({ id, name, link }));

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
        <Modal isShowen={zoom} onClose={() => { setZoom(false); }}>
          <SimpleZoom
            src={getStaticUrl('img', ImageFolder.ZOOM, section.items[lookIndex].zoom)}
            alt={`Look ${lookIndex + 1}`}
          />
        </Modal>

        <Modal onClose={() => { setAddressShowen(false); }} isShowen={addressShowen}>
          <AddressList />
        </Modal>

        <Modal onClose={() => { setSectionsShowen(false); }} isShowen={sectionsShowen}>
          <SectionList
            activeSection={section.link}
            sections={sections}
            onSectionChange={onSectionChange}
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
          <p>Цены действительны до 01.01.2021</p>
        </footer>
      </div>
    </div>
  );
};

MobileCatalog.propTypes = {
  data: PropTypes.object.isRequired,
  activeSection: PropTypes.number,
  activeLook: PropTypes.number,
  onSlideChange: PropTypes.func.isRequired,
  onSectionChange: PropTypes.func.isRequired,
};

MobileCatalog.defaultProps = {
  activeSection: 0,
  activeLook: 0,
};

export default MobileCatalog;
