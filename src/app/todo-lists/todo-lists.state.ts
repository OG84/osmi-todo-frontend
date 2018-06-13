import { Todo } from '../shared/todo.model';

export interface TodoListsState {
  todo: Todo;
  todos: Todo[];
}
