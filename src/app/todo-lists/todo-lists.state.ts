import { Todo } from '../shared/todo.model';

export interface TodoListsState {
  parent: Todo;
  self: Todo;
  children: Todo[];
}
