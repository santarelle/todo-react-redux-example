import { Todo } from '../../models/todo';

import { TodosServiceImpl } from './TodosServiceImpl';
import { TodosServiceMock } from './TodosServiceMock';

export interface TodosService {
  findByUserId(userId: number): Promise<Todo[]>;
}

const todosService: TodosService = process.env.NODE_ENV === 'test' ? new TodosServiceMock() : new TodosServiceImpl();

export { todosService };
