import React from 'react';
import Media from '../media';
import MobileCatalog from './mobile-catalog';
import DesktopCatalog from './desktop-catalog';
import { DESKTOP_MIN_WIDTH } from '../../const';
import { catalogPropTypes } from '../../prop-types';

const Catalog = ({
  activeSection,
  activeLook,
  sectionList,
  logotype,
  addressList,
  validTime,
  onSlideChange,
  onSectionChange,
}) => (
  <>
    <Media query={`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`}>
      <MobileCatalog
        activeSection={activeSection}
        activeLook={activeLook}
        sectionList={sectionList}
        logotype={logotype}
        addressList={addressList}
        validTime={validTime}
        onSlideChange={onSlideChange}
        onSectionChange={onSectionChange}
      />
    </Media>
    <Media query={`(min-width: ${DESKTOP_MIN_WIDTH}px)`}>
      <DesktopCatalog
        activeSection={activeSection}
        activeLook={activeLook}
        sectionList={sectionList}
        logotype={logotype}
        addressList={addressList}
        validTime={validTime}
        onSlideChange={onSlideChange}
        onSectionChange={onSectionChange}
      />
    </Media>
  </>
);

Catalog.propTypes = catalogPropTypes;

Catalog.defaultProps = {
  activeLook: 0,
  validTime: '',
};

export default Catalog;
