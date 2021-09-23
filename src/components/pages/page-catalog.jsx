import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { catalogService, brandService } from '../../data-services';
import Page404 from './page-404';
import CatalogInnerRouter from '../catalog/catalog-inner-router';
import PagePreloader from './page-preloader';
import Transition from './transition';

// const prepareTextItem = (id, text, cost, brandRegExp) => {

// };

// const prepareLookText = (items, brandRegExp) => items.map(({ id, text, cost }) => prepareTextItem(id, text, cost, brandRegExp));

// const prepareCatalogData = (data, brands) => {
//   const brandRegExp = getBrandRegExp(brands);

//   return {
//     ...data,
//     sections: data.sections.map((section) => ({
//       ...section,
//       items: section.items.map((look) => ({
//         ...look,
//         paragraphs: prepareLookText(look.items, brandRegExp),
//       })),
//     })),
//   };
// };

const PageCatalog = ({ category, catalog }) => {
  const [data, setData] = React.useState({ sections: [] });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [redirect, setRedirect] = React.useState('');

  const redirectHandler = (url) => { setRedirect(url); };

  React.useEffect(() => {
    setIsLoading(true);

    Promise.all([
      catalogService.getCatalog(category, catalog),
      brandService.getBrands(),
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
    return <div>{error.message}</div>;
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
