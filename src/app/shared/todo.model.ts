import { DropType } from '../todo-lists/todo-lists.actions';

export interface Todo {
  id?: string;
  parentId?: string;
  name: string;
  dueDate?: number;
  isSelected?: boolean;
  prio?: number;
  dropType?: DropType;
}
