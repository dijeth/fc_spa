import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { CatalogService } from '../../data-services/catalog-service';
import Page404 from './page-404';
import CatalogInnerRouter from '../catalog/catalog-inner-router';
import PagePreloader from './page-preloader';

const catalogService = new CatalogService();

const PageCatalog = ({ category, catalog }) => {
  const [data, setData] = React.useState({ sections: [] });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState('');

  const redirectHandler = (url) => { setRedirect(url); };

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

  if (isLoading) {
    return <PagePreloader />;
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
    <CatalogInnerRouter
      data={data}
      category={category}
      catalog={catalog}
      onRedirect={redirectHandler}
    />
  );
};

PageCatalog.propTypes = {
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
};

PageCatalog.defaultProps = {
};

export default PageCatalog;
