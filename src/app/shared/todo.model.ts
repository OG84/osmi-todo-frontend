export interface Todo {
  _id?: string;
  parentId?: string;
  parent?: Todo;
  name: string;
  urlSaveName?: string;
  todos?: Todo[];
  isSelected?: boolean;
}
