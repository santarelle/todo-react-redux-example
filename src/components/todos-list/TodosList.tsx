import React from 'react';

import { Todo } from '../../models/todo';
import { TodoItem } from '../todo-item/TodoItem';

type TodosListProps = {
  todos: Todo[];
};

export const TodosList: React.FC<TodosListProps> = ({ todos }: TodosListProps) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
