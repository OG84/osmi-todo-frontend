import { Todo } from './todo.model';
import { ClipboardAction } from 'src/app/shared/todos.actions';

export interface TodosState {
  listInputValue: string;
  isListInputShaking: boolean;
  clipboard: ClipboardAction[];
}
