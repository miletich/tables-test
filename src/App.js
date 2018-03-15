import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';
import Tables from './containers/Tables';

const App = () => (
  <div>
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Redirect exact from="/" to="/tables/carPurchases" />
          <Route path="/tables/:table?" component={Tables} />
          <Route component={() => <div>404</div>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
