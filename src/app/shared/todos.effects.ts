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
  Upsert,
  UpsertSuccess,
  UpsertFailure,
  Delete,
  DeleteSuccess,
  DeleteFailure,
  ListInputShakingStart,
  ListInputShakingStop,
  ListInputValueChanged
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
  add: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT),
    mergeMap((action: Upsert) => this.http.post<Todo>(`${environment.apiBasePath}todos`, action.todo).pipe(
      map(todo => new UpsertSuccess(todo)),
      catchError(() => of(new UpsertFailure()))
    ))
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
    ofType(TodosActionTypes.UPSERT_SUCCESS),
    map(x => new ListInputValueChanged(''))
  );

  @Effect()
  psertFailure: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_FAILURE),
    map(action => {
      timer(1000).subscribe(x => this.store.dispatch(new ListInputShakingStop()));

      return new ListInputShakingStart();
    })
  );
}
