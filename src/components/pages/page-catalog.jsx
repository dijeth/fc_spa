import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, useHistory, useRouteMatch } from 'react-router-dom';
import { CatalogService } from '../../data-services/catalog-service';
import Page404 from './page-404';
import DesktopCatalog from '../catalog/desktop-catalog';
import MobileCatalog from '../catalog/mobile-catalog';
import Media from '../media';
import { getUrl } from '../../utils/common-utils';
import { DESKTOP_MIN_WIDTH } from '../../const';

const catalogService = new CatalogService();

const parseRouteParams = (sections) => {
  const match = useRouteMatch('/:category/:catalog/:param1/:param2')
    || useRouteMatch('/:category/:catalog/:param1')
    || useRouteMatch('/:category/:catalog');

  const { param1, param2 } = match.params;

  if (!param1) {
    return {
      section: 0,
      look: 0,
    };
  }

  if (!param2) {
    const isSection = sections.findIndex((it) => it === param1) !== -1;
    return isSection
      ? {
        section: param1,
        look: 0,
      }
      : {
        section: 0,
        look: parseInt(param1, 10) - 1 || 0,
      };
  }

  const section = sections.findIndex((it) => it === param1);

  return {
    section: section === -1 ? 0 : section,
    look: parseInt(param2, 10) - 1 || 0,
  };
};

const PageCatalog = ({ category, catalog }) => {
  const [data, setData] = React.useState({ sections: [] });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState('');

  const history = useHistory();

  React.useEffect(() => {
    setIsLoading(true);

    catalogService
      .getCatalog(category, catalog)
      .then(
        (result) => {
          setIsLoading(false);
          if (result) { setData(result); }
        },
        (err) => {
          setIsLoading(false);
          setError(err);
        },
      );
  }, [category, catalog]);

  React.useEffect(() => {
    setRedirect('');
  }, [redirect]);

  const { section, look } = parseRouteParams(data.sections.map((it) => it.link));

  const getCatalogUrl = (catalogSection, catalogLook) => (data.sections.length > 1
    ? getUrl(category, catalog, catalogSection, catalogLook + 1)
    : getUrl(category, catalog, catalogLook + 1));

  const changeLookHandler = (catalogLook) => {
    history.push(getCatalogUrl(data.sections[section].link, catalogLook));
  };

  const changeSectionHandler = (catalogSection) => {
    setRedirect(getCatalogUrl(catalogSection, 0));
  };

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (!data || !data.sections.length) {
    return <Page404 />;
  }

  return (
    <>
      <Media query={`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`}>
        <MobileCatalog
          data={data}
          activeSection={section}
          activeLook={look}
          onSlideChange={changeLookHandler}
          onSectionChange={changeSectionHandler}
        />
      </Media>
      <Media query={`(min-width: ${DESKTOP_MIN_WIDTH}px)`}>
        <DesktopCatalog
          data={data}
          activeSection={section}
          activeLook={look}
          onSlideChange={changeLookHandler}
          onSectionChange={changeSectionHandler}
        />
      </Media>
    </>
  );
};

PageCatalog.propTypes = {
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
};

PageCatalog.defaultProps = {
};

export default PageCatalog;
