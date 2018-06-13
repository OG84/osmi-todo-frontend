import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable, of, timer } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
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
  init: Observable<Action> = this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(x => new FetchAll())
  );

  @Effect()
  upsertRoot: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT),
    map((x: Upsert) => {
      x.todo = this.todosService.createTodosWithOutParents(x.todo);
      return x;
    }),
    mergeMap(action => {
      let upsert = this.http.post<Todo>(`${environment.apiBasePath}todos`, action.todo);
      if (action.todo.parentId) {
        upsert = this.http.post<Todo>(`${environment.apiBasePath}todos/${action.todo.parentId}`, action.todo);
      }

      return upsert.pipe(
        map(todo => new UpsertSuccess(null)),
        catchError(() => of(new UpsertFailure()))
      );
    })
  );

  @Effect()
  refresh: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_SUCCESS),
    map(x => new FetchAll())
  );

  @Effect()
  delete: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.DELETE),
    mergeMap((action: Delete) => {
      if (action.todo.parentId) {
        this.snackbar.open('Deletion of nested todos not implemented yet :|', 'my bad', {
          duration: 5000
        });
        return of(new DeleteSuccess(action.todo._id));
      }

      return this.http.delete<Todo>(`${environment.apiBasePath}todos/${action.todo._id}`).pipe(
        map(() => new DeleteSuccess(action.todo._id)),
        catchError(() => of(new DeleteFailure(action.todo._id)))
      );
    })
  );

  @Effect()
  fetchAll: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.FETCH_ALL),
    mergeMap(action => this.http.get<Todo[]>(`${environment.apiBasePath}todos`).pipe(
      map(x => {
        x.forEach(todo => this.setParentTodoAndUrlSaveName(x, todo));
        return x;
      }),
      map(todos => new FetchAllSuccess(todos)),
      catchError((err) => of(new FetchAllFailure(err)))
    ))
  );

  @Effect({ dispatch: false })
  fetchAllFailure: Observable<Action> = this.actions.pipe(
    ofType(TodosActionTypes.FETCH_ALL_FAILURE),
    tap((x: FetchAllFailure) => console.log(x.error))
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

  private setParentTodoAndUrlSaveName(todos: Todo[], todo: Todo): void {
    todo.parent = this.todosService.findTodoById(todos, todo.parentId);
    todo.urlSaveName = this.todosService.createUrlSaveString(todo.name);

    for (const childTodo of todo.todos) {
      this.setParentTodoAndUrlSaveName(todos, childTodo);
    }
  }
}
