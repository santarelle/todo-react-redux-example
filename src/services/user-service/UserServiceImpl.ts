import { User } from '../../models/user';
import { api } from '../api';

import { UserService } from './UserService';

export class UserServiceImpl implements UserService {
  async findAll(): Promise<User[]> {
    const response = await api.get<User[]>('users');
    return response.data;
  }

  async findByUserId(userId: number): Promise<User> {
    const response = await api.get<User>(`users/${userId}`);
    return response.data;
  }
}
