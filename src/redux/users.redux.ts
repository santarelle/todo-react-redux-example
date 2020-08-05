import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAction, createReducer, ActionType } from 'typesafe-actions';

import { User } from '../models/user';
import { userService } from '../services/user-service/UserService';

import { RootState } from './root.redux';

// States
type UsersState = { users: User[]; loading: boolean };
const initialState: UsersState = { users: [], loading: false };

// Constants
const FETCH_USERS = 'users/FETCH_USERS' as const;
const FETCH_USERS_LOADING = 'users/FETCH_USERS_LOADING' as const;
const FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS' as const;
const CLEAN_USERS = 'usrs/CLEAN_USERS' as const;

// Actions
const fetchUsers = () => ({ type: FETCH_USERS, payload: userService.findAll() });
const fetchUsersLoading = createAction(FETCH_USERS_LOADING)();
const fetchUsersSuccess = createAction(FETCH_USERS_SUCCESS)<User[]>();
const cleanUsers = createAction(CLEAN_USERS)();

const actions = {
  fetchUsers,
  fetchUsersLoading,
  fetchUsersSuccess,
  cleanUsers,
};

type UserActions = ActionType<typeof actions>;

// Reducer
export const usersReducer = createReducer<UsersState, UserActions>(initialState, {
  [FETCH_USERS_LOADING]: (state) => ({
    ...state,
    loading: true,
  }),
  [FETCH_USERS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    users: action.payload,
  }),
  [CLEAN_USERS]: (state) => ({
    ...state,
    loading: false,
    users: [],
  }),
});

// Hooks
export const useUsersState = () => useSelector((state: RootState) => state.usersReducer);

export const useFetchUsersAction = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(fetchUsers()), [dispatch]);
};

export const useCleanUsersAction = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(cleanUsers()), [dispatch]);
};
