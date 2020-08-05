import { Todo } from '../../models/todo';

import { TodosService } from './TodosService';

export class TodosServiceMock implements TodosService {
  async findByUserId(userId: number): Promise<Todo[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            userId,
            id: 1,
            title: 'Item 1',
            completed: false,
          },
          {
            userId,
            id: 2,
            title: 'Item 2',
            completed: true,
          },
          {
            userId,
            id: 3,
            title: 'Item 3',
            completed: false,
          },
        ]);
      }, 1000);
    });
  }
}
