import React from 'react';
import { Switch, Route } from 'react-router-dom';

import data from '../data/';
import Table from '../components/Table';

const Tables = () => (
  <Switch>
    {Object.keys(data).map(key => (
      <Route path={`/tables/${key}`} component={() => <Table key={key} data={data[key]} />} />
    ))}
    <Route component={() => <p>404</p>} />
  </Switch>
);

export default Tables;
