import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { AppState } from 'src/app/app-state.model';
import { Observable, of } from 'rxjs';
import { TodoListsAction, TodoListsActionTypes } from 'src/app/todo-lists/todo-lists.actions';
import { map, tap, filter, switchMap, catchError, first } from 'rxjs/operators';
import * as fromTodoLists from './todo-lists.actions';
import * as fromTodos from '../shared/todos.actions';
import { Todo } from 'src/app/shared/todo.model';
import { RouterAction } from '@ngrx/router-store';
import { TodosService } from '../shared/todos.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { selectRouterParams } from '../router.selectors';

@Injectable()
export class TodoListsEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly todosService: TodosService,
    private readonly router: Router) { }

  @Effect()
  fetchChildren: Observable<TodoListsAction> = this.actions.pipe(
    ofType<fromTodoLists.FetchChildren>(TodoListsActionTypes.FETCH_CHILDREN),
    switchMap(x => {
      let apiGet = this.http.get<Todo[]>(`${environment.apiBasePath}todos`);

      if (x.parentTodoId) {
        apiGet = this.http.get<Todo[]>(`${environment.apiBasePath}todos?parentId=${x.parentTodoId}`);
      }

      return apiGet.pipe(
        map(todos => new fromTodoLists.FetchChildrenSuccess(todos)),
        catchError(err => of(new fromTodoLists.FetchChildrenFailure(x.parentTodoId)))
      );
    })
  );

  @Effect()
  fetchSelf: Observable<fromTodoLists.TodoListsAction> = this.actions.pipe(
    ofType<fromTodoLists.FetchSelf>(fromTodoLists.TodoListsActionTypes.FETCH_SELF),
    switchMap(x => {
      return this.http.get<Todo>(`${environment.apiBasePath}todos/${x.todoId}`).pipe(
        tap(todo => {
          if (todo.parentId) {
            this.store.dispatch(new fromTodoLists.FetchParent(todo.parentId));
          } else {
            this.store.dispatch(new fromTodoLists.FetchParentSuccess(null));
          }
        }),
        map(todo => new fromTodoLists.FetchSelfSuccess(todo)),
        catchError(res => of(new fromTodoLists.FetchSelfFailure(x.todoId)))
      );
    })
  );

  @Effect()
  fetchParent: Observable<fromTodoLists.TodoListsAction> = this.actions.pipe(
    ofType<fromTodoLists.FetchParent>(fromTodoLists.TodoListsActionTypes.FETCH_PARENT),
    switchMap(x => {
      return this.http.get<Todo>(`${environment.apiBasePath}todos/${x.todoId}`).pipe(
        map(todo => new fromTodoLists.FetchParentSuccess(todo)),
        catchError(res => of(new fromTodoLists.FetchParentFailure(x.todoId)))
      );
    })
  );

  @Effect({ dispatch: false })
  routerNavigation: Observable<Action> = this.actions.pipe(
    ofType('ROUTER_NAVIGATION'),
    map((x: any) => x.payload.routerState.params.todoId),
    tap(todoId => {
      this.reloadSelfAndChildren(todoId);
    })
  );

  @Effect({ dispatch: false })
  upsertOrDelete = this.actions.pipe(
    ofType(fromTodos.TodosActionTypes.UPSERT_SUCCESS, fromTodos.TodosActionTypes.DELETE_SUCCESS),
    switchMap(x => this.store.select(selectRouterParams).pipe(first())),
    tap(params => {
      const todoId = params['todoId'];
      this.reloadSelfAndChildren(todoId);
    })
  );

  private reloadSelfAndChildren(todoId: string): void {
    if (todoId) {
      this.store.dispatch(new fromTodoLists.FetchSelf(todoId));
    } else {
      this.store.dispatch(new fromTodoLists.FetchSelfSuccess(null));
    }

    this.store.dispatch(new fromTodoLists.FetchChildren(todoId));
  }
}
