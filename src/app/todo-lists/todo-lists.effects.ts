import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { Store, Action } from '@ngrx/store';
import { AppState } from 'src/app/app-state.model';
import { Observable } from 'rxjs';
import { TodoListsAction, TodoListsActionTypes } from 'src/app/todo-lists/todo-lists.actions';
import { map, combineLatest, tap, filter } from 'rxjs/operators';
import * as fromTodoLists from './todo-lists.actions';
import { selectTodos } from 'src/app/shared/todos.selectors';
import { Todo } from 'src/app/shared/todo.model';
import { RouterAction } from '@ngrx/router-store';
import { TodosService } from '../shared/todos.service';

@Injectable()
export class TodoListsEffects {
  constructor(
    private readonly actions: Actions,
    private readonly http: HttpClient,
    private readonly store: Store<AppState>,
    private readonly todosService: TodosService) { }

  @Effect()
  fetchTodos: Observable<TodoListsAction> = this.actions.pipe(
    ofType(TodoListsActionTypes.FETCH_TODOS),
    map(x => x as fromTodoLists.Fetch),
    combineLatest(this.store.select(selectTodos).pipe(filter(x => !!x))),
    map(([x, todos]) => {
      console.log(x);

      if (x.parentTodo) {
        return x.parentTodo.todos;
      }

      return todos;
    }),
    map(todos => new fromTodoLists.FetchSuccess(todos))
  );

  @Effect()
  setParentTodo: Observable<fromTodoLists.TodoListsAction> = this.actions.pipe(
    ofType(fromTodoLists.TodoListsActionTypes.SET_PARENT_TODO),
    map(x => x as fromTodoLists.SetParentTodo),
    map(x => new fromTodoLists.Fetch(x.parentTodo))
  );

  @Effect()
  routerNavigation: Observable<Action> = this.actions.pipe(
    ofType('ROUTER_NAVIGATION'),
    map((x: any) => x.payload.routerState.params.todoId),
    combineLatest(this.store.select(selectTodos).pipe(filter(x => !!x))),
    map(([todoId, allTodos]) => this.todosService.findTodoById(allTodos, todoId)),
    map(parentTodo => new fromTodoLists.SetParentTodo(parentTodo))
  );
}
