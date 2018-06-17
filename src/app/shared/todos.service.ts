import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import {
  selectIsListInputShaking,
  selectListInputValue,
  selectCopiedTodoIds,
  selectCuttedTodoIds
} from './todos.selectors';
import * as fromTodos from './todos.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { skip, first } from 'rxjs/operators';

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
    this.store.dispatch(new fromTodos.CopyAdd(todo._id));
  }

  cut(todo: Todo): void {
    this.store.dispatch(new fromTodos.CutAdd(todo._id));
  }

  paste(parentTodoId: string): void {
    this.store.dispatch(new fromTodos.Paste(parentTodoId));
  }

  get listInputValue(): Observable<string> {
    return this.store.select(selectListInputValue);
  }

  get isListInputShaking(): Observable<boolean> {
    return this.store.select(selectIsListInputShaking);
  }

  get copiedTodos(): Observable<string[]> {
    return this.store.select(selectCopiedTodoIds);
  }

  get cuttedTodos(): Observable<string[]> {
    return this.store.select(selectCuttedTodoIds);
  }

  updateListInputValue(value: string): void {
    this.store.dispatch(new fromTodos.ListInputValueChanged(value));
  }
}
