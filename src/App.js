import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';
import Tables from './containers/Tables';
import UiMessage from './components/UiMessage';

const App = () => (
  <div>
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Redirect exact from="/" to="/tables/carPurchases" />
          <Route path="/tables/:table?" component={Tables} />
          <Route component={() => <UiMessage>404: Not found</UiMessage>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
