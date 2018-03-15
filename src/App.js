import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => (
    <Router>
      <Switch>
        <Route component={() => <div>404</div>} />
      </Switch>
    </Router>
);

export default App;
