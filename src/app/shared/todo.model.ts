export interface Todo {
  _id?: string;
  parentId?: string;
  name: string;
  isSelected?: boolean;
}
