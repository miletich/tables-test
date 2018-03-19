import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Navigation from './components/Navigation';
import Table from './containers/Table';
import UiMessage from './components/UiMessage';
import withData from './hocs/withData';

const App = () => (
  <div>
    <Router>
      <div>
        <Navigation />
        <Switch>
          <Redirect exact from="/" to="/tables/car_purchases" />
          <Route path="/tables/:table" component={({ match: { params: table } }) => withData(table)(Table)} />
          <Route component={() => <UiMessage>404: Not found</UiMessage>} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
