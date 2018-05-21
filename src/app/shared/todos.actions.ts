import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodosActionTypes {
  UPSERT = '[todos] upsert',
  UPSERT_SUCCESS = '[todos] upsert success',
  UPSERT_FAILURE = '[todos] upsert failure',
  FETCH_ALL = '[todos] fetch all',
  FETCH_ALL_SUCCESS = '[todos] fetch all success',
  FETCH_ALL_FAILURE = '[todos] fetch all failure'
}

export class Upsert implements Action {
  readonly type = TodosActionTypes.UPSERT;

  constructor(public todo: Todo) { }
}

export class UpsertSuccess implements Action {
  readonly type = TodosActionTypes.UPSERT_SUCCESS;

  constructor(public todo: Todo) { }
}

export class UpsertFailure implements Action {
  readonly type = TodosActionTypes.UPSERT_FAILURE;
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

export type TodosAction = Upsert |
  UpsertSuccess |
  UpsertFailure |
  FetchAll |
  FetchAllSuccess |
  FetchAllFailure;
