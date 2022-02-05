import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { BASE_ROUTE } from './const';
import { insertMetrics } from './utils';

insertMetrics();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename={BASE_ROUTE} forceRefresh={false}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
