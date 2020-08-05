import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useUsersState, useFetchUsersAction, useCleanUsersAction } from '../../redux/users.redux';

import './UsersListPage.scss';

export const UsersListPage: React.FC = () => {
  const { users, loading } = useUsersState();
  const fetchUsers = useFetchUsersAction();
  const cleanUsers = useCleanUsersAction();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    return () => {
      cleanUsers();
    };
  }, [cleanUsers]);

  return (
    <div className="users-list-container">
      <h1>Users</h1>
      {loading && <h1>Loading...</h1>}
      {!loading &&
        users.map((user) => (
          <div key={user.id}>
            <span>{user.name}</span>
            <Link to={`/${user.id}/todos`}>Todo</Link>
          </div>
        ))}
    </div>
  );
};
