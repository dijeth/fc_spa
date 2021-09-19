import React from 'react';
import PropTypes from 'prop-types';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import { CatalogService } from '../../data-services/catalog-service';
import Page404 from './page-404';
import Media from '../media';
import { getUrl } from '../../utils/common-utils';
import { DESKTOP_MIN_WIDTH } from '../../const';
import Catalog from '../catalog/catalog';

const catalogService = new CatalogService();

const getSection = (catalog, sectionLink) => catalog.sections.find((it) => it.link === sectionLink);

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

  const sectionList = data.sections.map(({ id, section: name, link }) => ({ id, name, link }));

  const getCatalogUrl = (catalogSection, catalogLook) => (data.sections.length > 1
    ? getUrl(category, catalog, catalogSection, catalogLook + 1)
    : getUrl(category, catalog, catalogLook + 1));

  const changeLookHandlerFactory = (section) => (catalogLook) => {
    history.push(getCatalogUrl(section.link, catalogLook));
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

  if (data.sections.length > 1) {
    return (
      <Switch>
        <Route
          path="/:category/:catalog/:section/:look"
          render={({ match }) => {
            const { section: sectionLink, look } = match.params;
            const section = getSection(data, sectionLink);
            const lookIndex = look - 1;

            return section && section.items[lookIndex]
              ? (
                <Catalog
                  activeSection={section}
                  activeLook={lookIndex}
                  sectionList={sectionList}
                  onSlideChange={changeLookHandlerFactory(section)}
                  onSectionChange={changeSectionHandler}
                />
              )
              : <Page404 />;
          }}
        />

        <Route
          path="/:category/:catalog/:section/"
          render={({ match }) => {
            const { section: sectionLink } = match.params;
            const section = getSection(data, sectionLink);

            return section && section.items.length
              ? <Redirect to={getCatalogUrl(section.link, 0)} />
              : <Page404 />;
          }}
        />

        <Route
          path="/:category/:catalog/"
          render={() => {
            const section = data.sections[0];

            return section && section.items.length
              ? (
                <>
                  <Media query={`(max-width: ${DESKTOP_MIN_WIDTH - 1}px)`}>
                    <p>
                      выбор секции
                    </p>
                  </Media>

                  <Media query={`(min-width: ${DESKTOP_MIN_WIDTH}px)`}>
                    <Redirect to={getCatalogUrl(section.link, 0)} />
                  </Media>
                </>
              )
              : <Page404 />;
          }}
        />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route
        path="/:category/:catalog/:look"
        render={({ match }) => {
          const { look } = match.params;
          const section = data.sections[0];
          const lookIndex = look - 1;

          return section && section.items[lookIndex]
            ? (
              <Catalog
                activeSection={section}
                activeLook={lookIndex}
                sectionList={sectionList}
                onSlideChange={changeLookHandlerFactory(data.sections[0].link)}
                onSectionChange={changeSectionHandler}
              />
            )
            : <Page404 />;
        }}
      />

      <Route
        path="/:category/:catalog/"
        render={() => {
          const section = data.sections[0];

          return section && section.items.length
            ? <Redirect to={getCatalogUrl(section.link, 0)} />
            : <Page404 />;
        }}
      />
    </Switch>
  );
};

PageCatalog.propTypes = {
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
};

PageCatalog.defaultProps = {
};

export default PageCatalog;
