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
import { Store, Action } from '@ngrx/store';
import { TodosService } from './todos.service';

@Injectable()
export class TodosEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly todosService: TodosService) {
    console.log('init');

  }

  @Effect()
  init: Observable<Action> = this.actions.pipe(
    ofType(ROOT_EFFECTS_INIT),
    map(x => new FetchAll())
  );

  @Effect()
  upsertRoot: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_ROOT),
    map((x: UpsertRoot) => {
      x.todo.parent = null;
      return x;
    }),
    mergeMap((action: UpsertRoot) => this.http.post<Todo>(`${environment.apiBasePath}todos`, action.todo).pipe(
      map(todo => new UpsertRootSuccess(todo)),
      catchError(() => of(new UpsertRootFailure()))
    ))
  );

  @Effect()
  refresh: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_ROOT_SUCCESS, TodosActionTypes.UPSERT_CHILD_SUCCESS),
    map(x => new FetchAll())
  );

  @Effect()
  upsertChild: Observable<TodosAction> = this.actions.pipe(
    ofType(TodosActionTypes.UPSERT_CHILD),
    map((x: UpsertChild) => {
      x.todo.parent = null;
      return x;
    }),
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
      map(x => {
        x.forEach(todo => this.setParentTodoAndUrlSaveName(x, todo));
        return x;
      }),
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

  private setParentTodoAndUrlSaveName(todos: Todo[], todo: Todo): void {
    todo.parent = this.todosService.findTodoById(todos, todo.parentId);
    todo.urlSaveName = this.todosService.createUrlSaveString(todo.name);

    for (const childTodo of todo.todos) {
      this.setParentTodoAndUrlSaveName(todos, childTodo);
    }
  }
}
