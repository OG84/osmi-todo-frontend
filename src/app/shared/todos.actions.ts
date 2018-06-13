import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodosActionTypes {
  UPSERT = '[todos] upsert',
  UPSERT_SUCCESS = '[todos] upsert success',
  UPSERT_FAILURE = '[todos] upsert failure',
  DELETE = '[todos] delete',
  DELETE_SUCCESS = '[todos] delete success',
  DELETE_FAILURE = '[todos] delete failure',
  SELECT = '[todos] select',
  FETCH_ALL = '[todos] fetch all',
  FETCH_ALL_SUCCESS = '[todos] fetch all success',
  FETCH_ALL_FAILURE = '[todos] fetch all failure',
  LIST_INPUT_SHAKING_START = '[todos] list input shaking start',
  LIST_INPUT_SHAKING_STOP = '[todos] list input shaking stop',
  LIST_INPUT_VALUE_CHANGED = '[todos] list input value changed'
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

export class Delete implements Action {
  readonly type = TodosActionTypes.DELETE;

  constructor(public todo: Todo) { }
}

export class DeleteSuccess implements Action {
  readonly type = TodosActionTypes.DELETE_SUCCESS;

  constructor(public todoId: string) { }
}

export class DeleteFailure implements Action {
  readonly type = TodosActionTypes.DELETE_FAILURE;

  constructor(public failedTodoId: string) { }
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

  constructor(public error: string) { }
}

export class Select implements Action {
  readonly type = TodosActionTypes.SELECT;

  constructor(public todo: Todo, public isSelected: boolean) { }
}

export class ListInputShakingStart implements Action {
  readonly type = TodosActionTypes.LIST_INPUT_SHAKING_START;
}

export class ListInputShakingStop implements Action {
  readonly type = TodosActionTypes.LIST_INPUT_SHAKING_STOP;
}

export class ListInputValueChanged implements Action {
  readonly type = TodosActionTypes.LIST_INPUT_VALUE_CHANGED;

  constructor(public value: string) { }
}

export type TodosAction = Upsert |
  UpsertSuccess |
  UpsertFailure |
  Delete |
  DeleteSuccess |
  DeleteFailure |
  FetchAll |
  FetchAllSuccess |
  FetchAllFailure |
  Select |
  ListInputShakingStart |
  ListInputShakingStop |
  ListInputValueChanged;
