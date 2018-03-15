import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ErrorBoundary from './containers/ErrorBoundary';

/* global document:false */
ReactDOM.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  document.getElementById('app')
);
