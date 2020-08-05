import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { TodosListPage } from './pages/todos-list/TodosListPage';
import { UsersListPage } from './pages/users-list/UsersListPage';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={UsersListPage} />
      <Route path="/:userId/todos" component={TodosListPage} />
    </Switch>
  );
};
