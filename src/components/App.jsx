import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNewCollections from './pages/PageNewCollections';
import PageCatalog from './pages/PageCatalog';
import Page404 from './pages/Page404';

const App = () => (
  <Switch>
    <Route path="/new" component={PageNewCollections} />
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
