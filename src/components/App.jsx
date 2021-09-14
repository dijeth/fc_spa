import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PageNewCollections from './pages/page-new-collections';
import PageCatalog from './pages/page-catalog';
import Page404 from './pages/page-404';
import Media from './media';

const App = () => (
  <Switch>
    <Route path="/new" component={PageNewCollections} />
    <Route path="/test">
      <Media query="(max-width: 400px)">
        <h1>max-width: 400px</h1>
      </Media>
      <Media query="(min-width: 400px) and (max-width: 1000px)">
        <h1>(min-width: 400px) and (max-width: 1000px)</h1>
      </Media>
      <Media query="(min-width: 1000px)">
        <h1>min-width: 1000px</h1>
      </Media>
    </Route>
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
