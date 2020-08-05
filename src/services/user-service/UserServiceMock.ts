import { User } from '../../models/user';

import { UserService } from './UserService';

export class UserServiceMock implements UserService {
  async findAll(): Promise<User[]> {
    return [
      {
        id: 1,
        name: 'Bret',
        email: 'Sincere@april.biz',
      },
      {
        id: 2,
        name: 'Antonette',
        email: 'Shanna@melissa.tv',
      },
    ] as User[];
  }

  async findByUserId(userId: number): Promise<User> {
    return {
      id: userId,
      name: 'Bret',
      email: 'Sincere@april.biz',
    };
  }
}
