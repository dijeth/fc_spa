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
  onSlideChange,
  onSectionChange,
}) => {
  console.log(111);
  return (
    <>
      <Media query={`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`}>
        <MobileCatalog
          activeSection={activeSection}
          activeLook={activeLook}
          sectionList={sectionList}
          onSlideChange={onSlideChange}
          onSectionChange={onSectionChange}
        />
      </Media>
      <Media query={`(min-width: ${DESKTOP_MIN_WIDTH}px)`}>
        <DesktopCatalog
          activeSection={activeSection}
          activeLook={activeLook}
          sectionList={sectionList}
          onSlideChange={onSlideChange}
          onSectionChange={onSectionChange}
        />
      </Media>
    </>
  );
};

Catalog.propTypes = catalogPropTypes;

Catalog.defaultProps = {
  activeLook: 0,
};

export default Catalog;
