export interface Todo {
  _id?: string;
  name: string;
  todos?: Todo[];
  isSelected?: boolean;
}
