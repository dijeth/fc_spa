import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Page404 from './page-404';
import Page500 from './page-500';
import CatalogInnerRouter from '../catalog/catalog-inner-router';
import PagePreloader from './page-preloader';
import Transition from './transition';
import { getData } from '../../data-service';
import { ErrorMessage } from '../../const';

const PageCatalog = ({ category, catalog }) => {
  const [data, setData] = React.useState({ sections: [] });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState('');

  const redirectHandler = (url) => { setRedirect(url); };

  React.useEffect(() => {
    setIsLoading(true);

    Promise.all([
      getData(`${category}/${catalog}`),
      getData('brands'),
    ])
      .then(
        ([catalogData, brands]) => {
          setIsLoading(false);
          if (catalogData) {
            setData({
              ...catalogData,
              allBrands: brands,
            });
          }
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
    return error.message === ErrorMessage.NOT_FOUND
      ? <Page404 />
      : <Page500 />;
  }

  if (redirect) {
    return <Redirect to={redirect} />;
  }

  if (!data || !data.sections.length) {
    return <Page404 />;
  }

  return (
    <Transition>
      <CatalogInnerRouter
        data={data}
        category={category}
        catalog={catalog}
        onRedirect={redirectHandler}
      />
    </Transition>
  );
};

PageCatalog.propTypes = {
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
};

PageCatalog.defaultProps = {
};

export default PageCatalog;
