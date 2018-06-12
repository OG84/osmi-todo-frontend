import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodosActionTypes {
  UPSERT_ROOT = '[todos] upsert root',
  UPSERT_ROOT_SUCCESS = '[todos] upsert root success',
  UPSERT_ROOT_FAILURE = '[todos] upsert root failure',
  UPSERT_CHILD = '[todos] upsert child',
  UPSERT_CHILD_SUCCESS = '[todos] upsert child success',
  UPSERT_CHILD_FAILURE = '[todos] upsert child failure',
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

export class UpsertRoot implements Action {
  readonly type = TodosActionTypes.UPSERT_ROOT;

  constructor(public todo: Todo) { }
}

export class UpsertRootSuccess implements Action {
  readonly type = TodosActionTypes.UPSERT_ROOT_SUCCESS;

  constructor(public todo: Todo) { }
}

export class UpsertRootFailure implements Action {
  readonly type = TodosActionTypes.UPSERT_ROOT_FAILURE;
}


export class UpsertChild implements Action {
  readonly type = TodosActionTypes.UPSERT_CHILD;

  constructor(public todo: Todo, public parentTodoId: string) { }
}

export class UpsertChildSuccess implements Action {
  readonly type = TodosActionTypes.UPSERT_CHILD_SUCCESS;

  constructor(public upsertedRootTodo: Todo) { }
}

export class UpsertChildFailure implements Action {
  readonly type = TodosActionTypes.UPSERT_CHILD_FAILURE;
}

export class Delete implements Action {
  readonly type = TodosActionTypes.DELETE;

  constructor(public todoId: string) { }
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

export type TodosAction = UpsertRoot |
  UpsertRootSuccess |
  UpsertRootFailure |
  UpsertChild |
  UpsertChildSuccess |
  UpsertChildFailure |
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
