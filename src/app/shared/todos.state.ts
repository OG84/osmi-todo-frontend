import { Todo } from './todo.model';

export interface TodosState {
  todos: Todo[];
  listInputValue: string;
  isListInputShaking: boolean;
}
