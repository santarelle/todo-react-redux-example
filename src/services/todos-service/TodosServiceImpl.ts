import { Todo } from '../../models/todo';
import { api } from '../api';

import { TodosService } from './TodosService';

export class TodosServiceImpl implements TodosService {
  async findByUserId(userId: number): Promise<Todo[]> {
    const response = await api.get<Todo[]>(`todos?userId=${userId}`);
    return response.data.splice(0, 3);
  }
}
