import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { selectTodos, selectSelectedTodos } from './todos.selectors';
import * as fromTodos from './todos.actions';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TodosService {
  constructor(
    private readonly store: Store<AppState>,
    private readonly http: HttpClient) {

    this.fetchAll();
  }

  addTodo(todo: Todo): void {
    this.store.dispatch(new fromTodos.Upsert(todo));
  }

  deleteTodo(todoId: string): void {
    this.store.dispatch(new fromTodos.Delete(todoId));
  }

  updateTodo(todo: Todo): void {
    this.store.dispatch(new fromTodos.Upsert(todo));
  }

  selectTodo(todo: Todo, isSelected: boolean): void {
    this.store.dispatch(new fromTodos.Select(todo, isSelected));
  }

  get todos(): Observable<Todo[]> {
    return this.store.select(selectTodos);
  }

  get selectedTodos(): Observable<Todo[]> {
    return this.store.select(selectSelectedTodos);
  }

  private fetchAll(): void {
    this.store.dispatch(new fromTodos.FetchAll());
  }
}
