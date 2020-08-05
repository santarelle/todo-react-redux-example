import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';

import { InputTodo } from '../../components/input-todo/InputTodo';
import { TodosList } from '../../components/todos-list/TodosList';
import { User } from '../../models/user';
import { useTodosState, useFetchTodosAction, useCleanTodosAction } from '../../redux/todos.redux';
import { userService } from '../../services/user-service/UserService';

import './TodosListPage.scss';

type RouteParams = {
  userId: string;
};

export const TodosListPage: React.FC = () => {
  const routeMatch = useRouteMatch<RouteParams>();
  const history = useHistory();
  const { userId } = routeMatch.params;

  const [user, setUser] = useState<User>();

  const { todos, loading: loadingTodos } = useTodosState();
  const fetchTodos = useFetchTodosAction();
  const cleanTodos = useCleanTodosAction();

  useEffect(() => {
    userService
      .findByUserId(parseInt(userId))
      .then((data) => setUser(data))
      .catch(() => {
        alert(`User ID ${userId} not exist`);
        history.push('/');
      });
  }, [userId, history]);

  useEffect(() => {
    if (user) {
      fetchTodos(user.id);
    }
  }, [fetchTodos, user]);

  useEffect(() => {
    return () => {
      cleanTodos();
    };
  }, [cleanTodos]);

  return (
    <div className="todos-list-container">
      {!user && <h1>Loading User...</h1>}

      {user && (
        <>
          <h1>
            <Link to="/">{user?.name}</Link>
            &apos;s TODO
          </h1>
        </>
      )}

      <hr />

      {loadingTodos && <h1>Loading Todos...</h1>}
      {!loadingTodos && todos.length > 0 && (
        <>
          <h1>TODO List</h1>
          <InputTodo />
          <TodosList todos={todos} />
        </>
      )}
    </div>
  );
};
