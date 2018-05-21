import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import { selectTodos } from './todos.selectors';
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

  get todos(): Observable<Todo[]> {
    return this.store.select(selectTodos);
  }

  private fetchAll(): void {
    this.store.dispatch(new fromTodos.FetchAll());
  }
}
