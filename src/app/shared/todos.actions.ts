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
  CLIPBOARD_ADD = '[todos] clipboard add',
  CLIPBOARD_REMOVE = '[todos] clipboard remove',
  CLIPBOARD_CLEAR = '[todos] clipboard clear',
  PASTE = '[todos] paste',
  PASTE_SUCCESS = '[todos] paste success'
}

export enum ClipboardActionType {
  COPY = 'COPY',
  CUT = 'CUT'
}

export interface ClipboardAction {
  todoId: string;
  todoName: string;
  type: ClipboardActionType;
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

export class ClipboardAdd implements Action {
  readonly type = TodosActionTypes.CLIPBOARD_ADD;

  constructor(public clipboardAction: ClipboardAction) { }
}

export class ClipboardRemove implements Action {
  readonly type = TodosActionTypes.CLIPBOARD_REMOVE;

  constructor(public todoId: string) { }
}

export class ClipboardClear implements Action {
  readonly type = TodosActionTypes.CLIPBOARD_CLEAR;

  constructor() { }
}

export class Paste implements Action {
  readonly type = TodosActionTypes.PASTE;

  constructor(public clipboardAction: ClipboardAction) { }
}

export class PasteSuccess implements Action {
  readonly type = TodosActionTypes.PASTE_SUCCESS;

  constructor(public clipboardAction: ClipboardAction) { }
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
  ClipboardAdd |
  ClipboardRemove |
  ClipboardClear |
  Paste |
  PasteSuccess;
