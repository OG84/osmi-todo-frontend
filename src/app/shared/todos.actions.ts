import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodosActionTypes {
  ADD = '[todos] add todo',
  FETCH_ALL = '[todos] fetch all',
  FETCH_ALL_SUCCESS = '[todos] fetch all success',
  FETCH_ALL_FAILURE = '[todos] fetch all failure'
}

export class Add implements Action {
  readonly type = TodosActionTypes.ADD;

  constructor(public todo: Todo) { }
}

export class FetchAll implements Action {
  readonly type = TodosActionTypes.FETCH_ALL;
}

export class FetchAllSuccess implements Action {
  readonly type = TodosActionTypes.FETCH_ALL_SUCCESS;

  constructor(public todos: Todo[]) { }
}

export class FetchAllFailure implements Action {
  readonly type = TodosActionTypes.FETCH_ALL_FAILURE;
}

export type TodosAction = Add | FetchAll | FetchAllSuccess | FetchAllFailure;
