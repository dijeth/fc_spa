import React from 'react';
import PropTypes from 'prop-types';
import {
  Switch, Route, Redirect, useHistory,
} from 'react-router-dom';
import Catalog from './catalog';
import Page404 from '../pages/page-404';
import Media from '../media';
import { DESKTOP_MIN_WIDTH } from '../../const';
import { getUrl } from '../../utils';

const getSection = (catalog, sectionLink) => catalog.sections.find((it) => it.link === sectionLink);

const CatalogInnerRouter = ({
  data, category, catalog, onRedirect,
}) => {
  const history = useHistory();
  const sectionList = data.sections.map(({ id, section: name, link }) => ({ id, name, link }));

  const getCatalogUrl = (catalogSection, catalogLook) => (data.sections.length > 1
    ? getUrl(category, catalog, catalogSection, catalogLook + 1)
    : getUrl(category, catalog, catalogLook + 1));

  const changeLookHandlerFactory = (section) => (catalogLook) => {
    history.push(getCatalogUrl(section.link, catalogLook));
  };

  const changeSectionHandler = (catalogSection) => {
    onRedirect(getCatalogUrl(catalogSection, 0));
  };

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

CatalogInnerRouter.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  catalog: PropTypes.string.isRequired,
  onRedirect: PropTypes.func.isRequired,
};

CatalogInnerRouter.defaultProps = {};

export default CatalogInnerRouter;
