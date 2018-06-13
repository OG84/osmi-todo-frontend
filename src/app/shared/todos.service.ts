import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app-state.model';
import { Observable } from 'rxjs';
import { Todo } from './todo.model';
import {
  selectTodos,
  selectSelectedTodos,
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

  selectTodo(todo: Todo, isSelected: boolean): void {
    this.store.dispatch(new fromTodos.Select(todo, isSelected));
  }

  get todos(): Observable<Todo[]> {
    return this.store.select(selectTodos).pipe(skip(1));
  }

  get listInputValue(): Observable<string> {
    return this.store.select(selectListInputValue);
  }

  get isListInputShaking(): Observable<boolean> {
    return this.store.select(selectIsListInputShaking);
  }

  createUrlSaveString(input: string): string {
    if (!input) {
      return input;
    }

    return input.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  }

  createTodosWithOutParents(todo: Todo): Todo {
    const todoWithoutParents = JSON.stringify(todo, (key, val) => key === 'parent' ? null : val);
    return JSON.parse(todoWithoutParents);
  }

  updateListInputValue(value: string): void {
    this.store.dispatch(new fromTodos.ListInputValueChanged(value));
  }

  findTodoById(todos: Todo[], id: string): Todo {
    for (const todo of todos) {
      if (todo._id === id) {
        return todo;
      }

      const childTodo = this.findTodoById(todo.todos, id);
      if (childTodo) {
        return childTodo;
      }
    }

    return null;
  }

  findTodoByUrlSaveName(todos: Todo[], urlSaveName: string): Todo {
    for (const todo of todos) {
      if (todo.urlSaveName === urlSaveName) {
        return todo;
      }

      const childTodo = this.findTodoByUrlSaveName(todo.todos, urlSaveName);
      if (childTodo) {
        return childTodo;
      }
    }

    return null;
  }
}
