import React, { FormEvent, useState, useRef } from 'react';

import { useAddTodosAction } from '../../redux/todos.redux';

import './InputTodo.scss';

export const InputTodo: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const addTodo = useAddTodosAction();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo) {
      addTodo(newTodo, 1);
      setNewTodo('');
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="input-todo-container">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          autoFocus
          placeholder="Add TODO"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};
