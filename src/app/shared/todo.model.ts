export interface Todo {
  id?: string;
  parentId?: string;
  name: string;
  dueDate?: number;
  isSelected?: boolean;
  prio?: number;
}
