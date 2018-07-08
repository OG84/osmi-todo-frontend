import { Action } from '@ngrx/store';
import { Todo } from '../shared/todo.model';

export enum TodoListsActionTypes {
  FETCH_SELF = '[todo lists] fetch',
  FETCH_SELF_SUCCESS = '[todo lists] fetch success',
  FETCH_SEFL_FAILURE = '[todo lists] fetch failure',
  FETCH_PARENT = '[todo lists] fetch parent',
  FETCH_PARENT_SUCCESS = '[todo lists] fetch parent success',
  FETCH_PARENT_FAILURE = '[todo lists] fetch parent failure',
  FETCH_CHILDREN = '[todo lists] fetch children',
  FETCH_CHILDREN_SUCCESS = '[todo lists] fetch children success',
  FETCH_CHILDREN_FAILURE = '[todo lists] fetch children failure',
  SET_PARENT_TODO = '[todo lists] set parent todo',
  DROP = '[todo lists] drop',
}

export enum DropType {
  BEFORE,
  AFTER
}

export class FetchChildren implements Action {
  readonly type = TodoListsActionTypes.FETCH_CHILDREN;

  constructor(public parentTodoId?: string) { }
}

export class FetchChildrenSuccess implements Action {
  readonly type = TodoListsActionTypes.FETCH_CHILDREN_SUCCESS;

  constructor(public todos: Todo[]) { }
}

export class FetchChildrenFailure implements Action {
  readonly type = TodoListsActionTypes.FETCH_CHILDREN_FAILURE;

  constructor(public parentTodoId?: string) { }
}

export class FetchSelf implements Action {
  readonly type = TodoListsActionTypes.FETCH_SELF;

  constructor(public todoId: string) { }
}

export class FetchSelfSuccess implements Action {
  readonly type = TodoListsActionTypes.FETCH_SELF_SUCCESS;

  constructor(public todo: Todo) { }
}

export class FetchSelfFailure implements Action {
  readonly type = TodoListsActionTypes.FETCH_SEFL_FAILURE;

  constructor(public todoId: string) { }
}

export class FetchParent implements Action {
  readonly type = TodoListsActionTypes.FETCH_PARENT;

  constructor(public todoId: string) { }
}

export class FetchParentSuccess implements Action {
  readonly type = TodoListsActionTypes.FETCH_PARENT_SUCCESS;

  constructor(public todo: Todo) { }
}

export class FetchParentFailure implements Action {
  readonly type = TodoListsActionTypes.FETCH_PARENT_FAILURE;

  constructor(public todoId: string) { }
}

export class Drop implements Action {
  readonly type = TodoListsActionTypes.DROP;

  constructor(
    public dragStartTodoId: string,
    public dropTarget: Todo,
    public dropType: DropType) { }
}

export type TodoListsAction = FetchSelf | FetchSelfSuccess | FetchSelfFailure |
  FetchParent | FetchParentSuccess | FetchParentFailure |
  FetchChildren | FetchChildrenSuccess | FetchChildrenFailure | Drop;
