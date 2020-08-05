import { User } from '../../models/user';

import { UserServiceImpl } from './UserServiceImpl';
import { UserServiceMock } from './UserServiceMock';

export interface UserService {
  findAll(): Promise<User[]>;
  findByUserId(userId: number): Promise<User>;
}

const userService: UserService = process.env.NODE_ENV === 'test' ? new UserServiceMock() : new UserServiceImpl();

export { userService };
