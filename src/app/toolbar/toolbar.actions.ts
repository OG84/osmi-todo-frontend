import { Action } from '@ngrx/store';

export enum ToolbarActionTypes {
  SET_TITLE = '[toolbar] set title'
}

export class SetTitle implements Action {
  readonly type = ToolbarActionTypes.SET_TITLE;

  constructor(public title: string) { }
}

export type ToolbarAction = SetTitle;
