import { Action } from '@ngrx/store';
import { Todo } from '../shared/todo.model';

export enum TodoListsActionTypes {
  FETCH_TODOS = '[todo lists] fetch todos',
  FETCH_TODOS_SUCCESS = '[todo lists] fetch todos success',
  FETCH_TODOS_FAILURE = '[todo lists] fetch todos failure',
  SET_PARENT_TODO = '[todo lists] set parent todo'
}

export class Fetch implements Action {
  readonly type = TodoListsActionTypes.FETCH_TODOS;

  constructor(public parentTodo?: Todo) { }
}

export class FetchSuccess implements Action {
  readonly type = TodoListsActionTypes.FETCH_TODOS_SUCCESS;

  constructor(public todos: Todo[]) { }
}

export class FetchFailure implements Action {
  readonly type = TodoListsActionTypes.FETCH_TODOS_FAILURE;

  constructor(public parentTodo?: Todo) { }
}

export class SetParentTodo implements Action {
  readonly type = TodoListsActionTypes.SET_PARENT_TODO;

  constructor(public parentTodo: Todo) { }
}

export type TodoListsAction = Fetch | FetchSuccess | FetchFailure | SetParentTodo;
