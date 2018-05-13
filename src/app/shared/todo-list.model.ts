import { Todo } from 'src/app/shared/todo.model';

export interface TodoList {
  id: string;
  name: string;
  todoLists?: TodoList[];
  todos?: Todo[];
}
