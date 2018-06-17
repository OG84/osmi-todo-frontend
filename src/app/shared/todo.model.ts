export interface Todo {
  _id?: string;
  parentId?: string;
  name: string;
  dueDate?: string;
  isSelected?: boolean;
}
