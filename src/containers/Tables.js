import React from 'react';
import { Switch, Route } from 'react-router-dom';

import data from '../data/';
import Table from '../components/Table';
import UiMessage from '../components/UiMessage';

const Tables = () => (
  <div className="container">
    <Switch>
      {Object.keys(data).map(key => (
        <Route key={key} exact path={`/tables/${key}`} component={() => <Table data={data[key]} />} />
      ))}
      <Route component={() => <UiMessage>404: Not found</UiMessage>} />
    </Switch>
  </div>
);

export default Tables;
