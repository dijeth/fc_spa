import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { catalogService } from '../../data-services';
import PagePreloader from './page-preloader';
import Page404 from './page-404';
import Transition from './transition';

const PageMain = () => {
  const [data, setData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    catalogService.getCatalogs().then((catalogs) => {
      setData(catalogs);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <PagePreloader />;
  }

  if (!data || !data.length) {
    return <Page404 />;
  }

  return (
    <div className="wrapper">
      <Transition>
        {
        data.map((catalog) => (
          <p key={catalog.id}>
            <Link to={catalog.link}>
              <b>{catalog.brand}</b>
              {' '}
              {catalog.title}
            </Link>
          </p>
        ))
      }
      </Transition>
    </div>
  );
};

PageMain.propTypes = {};
PageMain.defaultProps = {};

export default PageMain;
