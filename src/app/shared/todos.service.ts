import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { selectTodos, selectSelectedTodos, selectIsListInputShaking, selectListInputValue } from './todos.selectors';
import * as fromTodos from './todos.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { skip } from 'rxjs/operators';

@Injectable()
export class TodosService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly http: HttpClient) {

    this.fetchAll();
  }

  upsertTodo(todo: Todo, parentTodoId?: string): void {
    if (parentTodoId) {
      this.store.dispatch(new fromTodos.UpsertChild(todo, parentTodoId));
      return;
    }

    this.store.dispatch(new fromTodos.UpsertRoot(todo));
  }

  deleteTodo(todoId: string): void {
    this.store.dispatch(new fromTodos.Delete(todoId));
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(new fromTodos.UpsertRoot(todo));
  }

  selectTodo(todo: Todo, isSelected: boolean): void {
    this.store.dispatch(new fromTodos.Select(todo, isSelected));
  }

  get todos(): Observable<Todo[]> {
    return this.store.select(selectTodos).pipe(skip(1));
  }

  get selectedTodos(): Observable<Todo[]> {
    return this.store.select(selectSelectedTodos);
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

  private fetchAll(): void {
    this.store.dispatch(new fromTodos.FetchAll());
  }
}
