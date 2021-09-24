import React from 'react';
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
    <Transition>
      <div className="wrapper modal modal--showen">
        <h1>Все каталоги</h1>
        <p>Здесь может быть страница со всеми каталогами, или с каталогами бренда, или с новыми коллекциями.</p>
        <p>Оформление и наполнение сейчас сделано для тестирования</p>
        <br />
        <ul className="section-list">
          {
            data.map((catalog) => (
              <li className="section-list__item" key={catalog.id}>
                <Link to={catalog.link}>
                  <b>{catalog.brand}</b>
                  <br />
                  {catalog.title}
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </Transition>
  );
};

PageMain.propTypes = {};
PageMain.defaultProps = {};

export default PageMain;
