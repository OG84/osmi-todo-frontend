import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable, of, timer } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import {
  TodosActionTypes,
  TodosAction,
  Upsert,
  UpsertSuccess,
  UpsertFailure,
  Delete,
  DeleteSuccess,
  DeleteFailure,
  ListInputShakingStart,
  ListInputShakingStop,
  ListInputValueChanged,
} from './todos.actions';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/app/shared/todo.model';
import { AppState } from '../app-state.model';
import { TodosService } from './todos.service';
import { Store, Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class TodosEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly todosService: TodosService,
    private readonly snackbar: MatSnackBar) {

  }

  @Effect()
  upsert: Observable<TodosAction> = this.actions.pipe(
    ofType<Upsert>(TodosActionTypes.UPSERT),
    mergeMap(action => {
      let apiUpsert = this.http.post<Todo>(`${environment.apiBasePath}todos`, action.todo);
      if (action.todo._id) {
        apiUpsert = this.http.put<Todo>(`${environment.apiBasePath}todos/${action.todo._id}`, action.todo);
      }

      return apiUpsert.pipe(
        map(todo => new UpsertSuccess(todo)),
        catchError(err => of(new UpsertFailure()))
      );
    })
  );

  @Effect()
  upsertSuccess: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_SUCCESS),
    map(x => new ListInputValueChanged(''))
  );

  @Effect()
  upsertFailure: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_FAILURE),
    map(action => {
      timer(1000).subscribe(x => this.store.dispatch(new ListInputShakingStop()));

      return new ListInputShakingStart();
    })
  );

  @Effect()
  delete: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.DELETE),
    mergeMap((action: Delete) => {
      return this.http.delete<Todo>(`${environment.apiBasePath}todos/${action.todo._id}`).pipe(
        map(() => new DeleteSuccess(action.todo._id)),
        catchError(() => of(new DeleteFailure(action.todo._id)))
      );
    })
  );
}
