import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNewCollections from './pages/page-new-collections';
import PageCatalog from './pages/page-catalog';
import Page404 from './pages/page-404';
import PageMain from './pages/page-main';

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
    <Route path="/" component={PageMain} />
    <Route path="*" component={Page404} />
  </Switch>
);

export default App;
