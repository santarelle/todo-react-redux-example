import React from 'react';

import { Todo } from '../../models/todo';
import { useToggleTodosAction, useRemoveTodosAction } from '../../redux/todos.redux';

import './TodoItem.scss';

type TodoItemProps = {
  todo: Todo;
};

export const TodoItem = (props: TodoItemProps) => {
  const { todo } = props;

  const toggleTodo = useToggleTodosAction(todo.id);
  const removeTodo = useRemoveTodosAction(todo.id);

  return (
    <div className="todo-item-container">
      <li>
        {todo.title}
        <button onClick={toggleTodo} className={todo.completed ? 'completed' : ''}>
          {todo.completed ? 'COMPLETED' : 'TODO'}
        </button>

        <button onClick={removeTodo} className="delete">
          REMOVE
        </button>
      </li>
    </div>
  );
};
