import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Tables from './containers/Tables';

const App = () => (
    <Router>
      <Switch>
        <Route path="/tables/:table?" component={Tables} />
        <Route component={() => <div>404</div>} />
      </Switch>
    </Router>
);

export default App;
