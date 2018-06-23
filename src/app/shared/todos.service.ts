import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import {
  selectIsListInputShaking,
  selectListInputValue,
  selectClipboard
} from './todos.selectors';
import * as fromTodos from './todos.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { skip, first } from 'rxjs/operators';
import { ClipboardActionType } from './todos.actions';

@Injectable()
export class TodosService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly http: HttpClient) {

  }

  upsert(todo: Todo): void {
    this.store.dispatch(new fromTodos.Upsert(todo));
  }

  delete(todo: Todo): void {
    this.store.dispatch(new fromTodos.Delete(todo));
  }

  copy(todo: Todo): void {
    const action: fromTodos.ClipboardAction = {
      todoId: todo._id,
      todoName: todo.name,
      type: ClipboardActionType.COPY
    };
    this.store.dispatch(new fromTodos.ClipboardAdd(action));
  }

  cut(todo: Todo): void {
    const action: fromTodos.ClipboardAction = {
      todoId: todo._id,
      todoName: todo.name,
      type: ClipboardActionType.CUT
    };
    this.store.dispatch(new fromTodos.ClipboardAdd(action));
  }

  paste(action: fromTodos.ClipboardAction): void {
    this.store.dispatch(new fromTodos.Paste(action));
  }

  get listInputValue(): Observable<string> {
    return this.store.select(selectListInputValue);
  }

  get isListInputShaking(): Observable<boolean> {
    return this.store.select(selectIsListInputShaking);
  }

  get clipboard(): Observable<fromTodos.ClipboardAction[]> {
    return this.store.select(selectClipboard);
  }

  updateListInputValue(value: string): void {
    this.store.dispatch(new fromTodos.ListInputValueChanged(value));
  }
}
