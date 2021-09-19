import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNewCollections from './pages/page-new-collections';
import PageCatalog from './pages/page-catalog';
import Page404 from './pages/page-404';
import PagePreloader from './pages/page-preloader';

const App = () => (
  <Switch>
    <Route path="/new" component={PageNewCollections} />
    <Route path="/test" component={PagePreloader} />
    <Route
      path="/:category/:catalog"
      render={({ match }) => {
        const { category, catalog } = match.params;
        return <PageCatalog category={category} catalog={catalog} />;
      }}
    />
    <Route path="*" component={Page404} />
  </Switch>
);

export default App;
