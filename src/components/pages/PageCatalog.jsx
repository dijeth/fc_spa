import React from 'react';
import PropTypes from 'prop-types';
import { useRouteMatch } from 'react-router-dom';
import { CatalogService } from '../../data-services/catalog-service';
import Page404 from './Page404';
import Catalog from '../catalog/Catalog';

const catalogService = new CatalogService();

const parseRouteParams = (sections) => {
  const match = useRouteMatch('/:category/:catalog/:param1/:param2') || useRouteMatch('/:category/:catalog/:param1') || useRouteMatch('/:category/:catalog');
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

const PageCatalog = ({ category, catalog, onChangeLocation }) => {
  const [data, setData] = React.useState({ sections: [] });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');

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

  const { section, look } = parseRouteParams(data.sections.map((it) => it.link));

  if (isLoading) {
    return <div>Loading.......</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data || !data.sections.length) {
    return <Page404 />;
  }

  return <Catalog data={data} activeSection={section} activeLook={look} onChangeLocation={onChangeLocation} />;
};

PageCatalog.propTypes = {
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
  onChangeLocation: PropTypes.func,
};

PageCatalog.defaultProps = {
  onChangeLocation: null,
};

export default PageCatalog;
