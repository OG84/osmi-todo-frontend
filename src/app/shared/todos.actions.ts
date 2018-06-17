import { Action } from '@ngrx/store';
import { Todo } from './todo.model';

export enum TodosActionTypes {
  UPSERT = '[todos] upsert',
  UPSERT_SUCCESS = '[todos] upsert success',
  UPSERT_FAILURE = '[todos] upsert failure',
  DELETE = '[todos] delete',
  DELETE_SUCCESS = '[todos] delete success',
  DELETE_FAILURE = '[todos] delete failure',
  LIST_INPUT_SHAKING_START = '[todos] list input shaking start',
  LIST_INPUT_SHAKING_STOP = '[todos] list input shaking stop',
  LIST_INPUT_VALUE_CHANGED = '[todos] list input value changed',
  COPY_ADD = '[todos] copy add',
  COPY_REMOVE = '[todos] copy remove',
  CUT_ADD = '[todos] cut add',
  CUT_REMOVE = '[todos] cut remove',
  PASTE = '[todos] paste',
  PASTE_SUCCESS = '[todos] paste success'
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

export class CopyAdd implements Action {
  readonly type = TodosActionTypes.COPY_ADD;

  constructor(public todoId: string) { }
}

export class CopyRemove implements Action {
  readonly type = TodosActionTypes.COPY_REMOVE;

  constructor(public todoId: string) { }
}

export class CutAdd implements Action {
  readonly type = TodosActionTypes.CUT_ADD;

  constructor(public todoId: string) { }
}

export class CutRemove implements Action {
  readonly type = TodosActionTypes.CUT_REMOVE;

  constructor(public todoId: string) { }
}

export class Paste implements Action {
  readonly type = TodosActionTypes.PASTE;

  constructor(public parentTodoId: string) { }
}

export class PasteSuccess implements Action {
  readonly type = TodosActionTypes.PASTE_SUCCESS;

  constructor() { }
}

export type TodosAction = Upsert |
  UpsertSuccess |
  UpsertFailure |
  Delete |
  DeleteSuccess |
  DeleteFailure |
  ListInputShakingStart |
  ListInputShakingStop |
  ListInputValueChanged |
  CopyAdd |
  CopyRemove |
  CutAdd |
  CutRemove |
  Paste |
  PasteSuccess;
