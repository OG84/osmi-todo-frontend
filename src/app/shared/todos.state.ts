import { Todo } from './todo.model';

export interface TodosState {
  listInputValue: string;
  isListInputShaking: boolean;
  copiedTodoIds: string[];
  cuttedTodoIds: string[];
}
