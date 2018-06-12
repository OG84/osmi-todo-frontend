import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of, timer } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {
  FetchAll,
  TodosActionTypes,
  FetchAllSuccess,
  TodosAction,
  FetchAllFailure,
  UpsertRoot,
  UpsertRootSuccess,
  UpsertRootFailure,
  Delete,
  DeleteSuccess,
  DeleteFailure,
  ListInputShakingStart,
  ListInputShakingStop,
  ListInputValueChanged,
  UpsertChild,
  UpsertChildSuccess,
  UpsertChildFailure
} from './todos.actions';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/app/shared/todo.model';
import { AppState } from '../app-state.model';
import { Store } from '@ngrx/store';

@Injectable()
export class TodosEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>) { }

  @Effect()
  upsertRoot: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_ROOT),
    mergeMap((action: UpsertRoot) => this.http.post<Todo>(`${environment.apiBasePath}todos`, action.todo).pipe(
      map(todo => new UpsertRootSuccess(todo)),
      catchError(() => of(new UpsertRootFailure()))
    ))
  );

  @Effect()
  upsertChild: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_CHILD),
    mergeMap((action: UpsertChild) => {
      let upsert = this.http.put<Todo>(`${environment.apiBasePath}todos/${action.todo._id}`, action.todo);

      if (!action.todo._id) {
        upsert = this.http.post<Todo>(`${environment.apiBasePath}todos/${action.parentTodoId}`, action.todo);
      }

      return upsert.pipe(
        map(upsertedRootTodo => new UpsertChildSuccess(upsertedRootTodo)),
        catchError(() => of(new UpsertChildFailure()))
      );
    })
  );

  @Effect()
  delete: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.DELETE),
    mergeMap((action: Delete) => this.http.delete<Todo>(`${environment.apiBasePath}todos/${action.todoId}`).pipe(
      map(() => new DeleteSuccess(action.todoId)),
      catchError(() => of(new DeleteFailure(action.todoId)))
    ))
  );

  @Effect()
  fetchAll: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.FETCH_ALL),
    mergeMap(action => this.http.get<Todo[]>(`${environment.apiBasePath}todos`).pipe(
      map(todos => new FetchAllSuccess(todos)),
      catchError(() => of(new FetchAllFailure()))
    ))
  );

  @Effect()
  upsertSuccess: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_ROOT_SUCCESS, TodosActionTypes.UPSERT_CHILD_SUCCESS),
    map(x => new ListInputValueChanged(''))
  );

  @Effect()
  upsertFailure: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_ROOT_FAILURE, TodosActionTypes.UPSERT_CHILD_FAILURE),
    map(action => {
      timer(1000).subscribe(x => this.store.dispatch(new ListInputShakingStop()));

      return new ListInputShakingStart();
    })
  );
}
