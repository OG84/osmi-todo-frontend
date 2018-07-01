import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Effect, Actions, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { Observable, of, timer, EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap, combineLatest, first, last, skip, withLatestFrom, switchMap } from 'rxjs/operators';
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
  Paste,
  PasteSuccess,
  ClipboardActionType,
  ClipboardAdd,
  ClipboardRemove,
  ClipboardClear
} from './todos.actions';
import { environment } from 'src/environments/environment';
import { Todo } from 'src/app/shared/todo.model';
import { AppState } from '../app-state.model';
import { TodosService } from './todos.service';
import { Store, Action } from '@ngrx/store';
import { MatSnackBar, MatBottomSheet, MatBottomSheetConfig, MatBottomSheetRef } from '@angular/material';
import { ClipboardComponent } from '../clipboard/clipboard.component';
import { selectRouterParams } from '../router.selectors';

@Injectable()
export class TodosEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly todosService: TodosService,
    private readonly snackbar: MatSnackBar,
    private readonly bottomSheet: MatBottomSheet) {

  }

  @Effect()
  upsert: Observable<TodosAction> = this.actions.pipe(
    ofType<Upsert>(TodosActionTypes.UPSERT),
    mergeMap(action => {
      let createNewTodoUrl = `${environment.apiBasePath}todos`;
      if (action.copyChildrenFromId) {
        createNewTodoUrl = `${createNewTodoUrl}?copyChildrenFromId=${action.copyChildrenFromId}`;
      }

      let apiUpsert = this.http.post<Todo>(createNewTodoUrl, action.todo);
      if (action.todo.id) {
        const updateTodoUrl = `${environment.apiBasePath}todos/${action.todo.id}`;
        apiUpsert = this.http.put<Todo>(updateTodoUrl, action.todo);
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
      return this.http.delete<Todo>(
        `${environment.apiBasePath}todos/${action.todo.id}`).pipe(
          map(() => new DeleteSuccess(action.todo.id)),
          catchError(() => of(new DeleteFailure(action.todo.id)))
        );
    })
  );

  @Effect()
  paste = this.actions.pipe(
    ofType<Paste>(TodosActionTypes.PASTE),
    withLatestFrom(this.store.select(selectRouterParams)),
    mergeMap(([action, routerParams]) => {
      const parentTodoId = routerParams.todoId;

      return this.http.get<Todo>(`${environment.apiBasePath}todos/${action.clipboardAction.todoId}`).pipe(
        withLatestFrom(parentTodoId ? this.http.get<Todo>(
          `${environment.apiBasePath}todos/${parentTodoId}`) : of(null)),
        map(([todo, parentTodo]) => {
          const _todo = {
            ...todo,
            // no id = api creates new todo (copy), with id = api updates todo (cut)
            id: action.clipboardAction.type === ClipboardActionType.COPY ? null : todo.id,
            parentId: parentTodoId,
            name: todo.name,
            dueDate: parentTodo ? parentTodo.dueDate : todo.dueDate
          };

          console.log(_todo);

          return _todo;
        }),
        tap(todo => this.todosService.upsert(todo, action.clipboardAction.todoId)),
        map(x => new PasteSuccess(action.clipboardAction)),
        catchError(err => err)
      );
    })
  );

  @Effect()
  pasteSuccess = this.actions.pipe(
    ofType<PasteSuccess>(TodosActionTypes.PASTE_SUCCESS),
    map(x => new ClipboardRemove(x.clipboardAction.todoId))
  );

  @Effect({ dispatch: false })
  clipboardChanged = this.todosService.clipboard.pipe(
    tap(clipboard => {
      const currentRef = this.bottomSheet._openedBottomSheetRef;

      if (currentRef && clipboard.length === 0) {
        this.bottomSheet._openedBottomSheetRef.dismiss();
        return;
      }

      if (currentRef && clipboard.length > 0) {
        return;
      }

      if (clipboard.length === 0) {
        return;
      }

      const config: MatBottomSheetConfig = {
        hasBackdrop: false
      };
      this.bottomSheet.open(ClipboardComponent, config);
    })
  );

}
