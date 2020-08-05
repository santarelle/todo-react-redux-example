import { combineReducers } from 'redux';

import { todosReducer } from './todos.redux';
import { usersReducer } from './users.redux';

export const rootReducer = combineReducers({
  todosReducer,
  usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
