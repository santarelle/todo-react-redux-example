import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAction, ActionType, createReducer } from 'typesafe-actions';

import { Todo } from '../models/todo';
import { todosService } from '../services/todos-service/TodosService';

import { RootState } from './root.redux';

// States
export type TodosState = { todos: Todo[]; loading: boolean };
const initialState: TodosState = { todos: [], loading: false };

// Constants
const ADD_TODO = 'todos/ADD_TODO' as const;
const TOGGLE_TODO = 'todos/TOOGLE_TODO' as const;
const REMOVE_TODO = 'todos/REMOVE_TODO' as const;
const CLEAN_TODOS = 'todos/CLEAN_TODOS' as const;
const FETCH_TODOS = 'todos/FETCH_TODOS' as const;
const FETCH_TODOS_LOADING = 'todos/FETCH_TODOS_LOADING' as const;
const FETCH_TODOS_SUCCESS = 'todos/FETCH_TODOS_SUCCESS' as const;

// Actions
const addTodo = createAction(ADD_TODO)<{ title: string; userId: number }>();
const toggleTodo = createAction(TOGGLE_TODO)<number>();
const removeTodo = createAction(REMOVE_TODO)<number>();
const cleanTodos = createAction(CLEAN_TODOS)();

const fetchTodos = (userId: number) => ({ type: FETCH_TODOS, payload: todosService.findByUserId(userId) });
const fetchTodosLoading = createAction(FETCH_TODOS_LOADING)();
const fetchTodosSuccess = createAction(FETCH_TODOS_SUCCESS)<Todo[]>();

const actions = {
  addTodo,
  toggleTodo,
  removeTodo,
  cleanTodos,
  fetchTodos,
  fetchTodosLoading,
  fetchTodosSuccess,
};

type TodosAction = ActionType<typeof actions>;

// Reducer
export const todosReducer = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, action) => ({
    ...state,
    loading: false,
    todos: state.todos.concat({
      userId: action.payload.userId,
      id: Math.max(...state.todos.map((todo) => todo.id)) + 1,
      title: action.payload.title,
      completed: false,
    }),
  }),
  [TOGGLE_TODO]: (state, { payload: id }) => ({
    ...state,
    loading: false,
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
  }),
  [REMOVE_TODO]: (state, { payload: id }) => ({
    ...state,
    loading: false,
    todos: state.todos.filter((todo) => todo.id !== id),
  }),
  [CLEAN_TODOS]: (state) => ({
    ...state,
    todos: [],
    loading: false,
  }),
  [FETCH_TODOS_LOADING]: (state) => ({
    ...state,
    todos: [],
    loading: true,
  }),
  [FETCH_TODOS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    todos: action.payload,
  }),
});

// Hooks
export const useTodosState = (): TodosState => useSelector((state: RootState) => state.todosReducer);

export const useFetchTodosAction = () => {
  const dispatch = useDispatch();
  return useCallback((userId: number) => dispatch(fetchTodos(userId)), [dispatch]);
};

export const useAddTodosAction = () => {
  const dispatch = useDispatch();
  return useCallback((title: string, userId: number) => dispatch(addTodo({ title, userId })), [dispatch]);
};

export const useToggleTodosAction = (todoId: number) => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(toggleTodo(todoId)), [dispatch, todoId]);
};

export const useRemoveTodosAction = (todoId: number) => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(removeTodo(todoId)), [dispatch, todoId]);
};

export const useCleanTodosAction = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(cleanTodos()), [dispatch]);
};
