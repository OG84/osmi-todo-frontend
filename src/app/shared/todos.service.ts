import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import {
  selectIsListInputShaking,
  selectListInputValue
} from './todos.selectors';
import * as fromTodos from './todos.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { skip } from 'rxjs/operators';

@Injectable()
export class TodosService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly http: HttpClient) {

  }

  upsertTodo(todo: Todo): void {
    this.store.dispatch(new fromTodos.Upsert(todo));
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(new fromTodos.Delete(todo));
  }

  get listInputValue(): Observable<string> {
    return this.store.select(selectListInputValue);
  }

  get isListInputShaking(): Observable<boolean> {
    return this.store.select(selectIsListInputShaking);
  }

  updateListInputValue(value: string): void {
    this.store.dispatch(new fromTodos.ListInputValueChanged(value));
  }
}
