import { TodosState } from './shared/todos.state';
import { RouterReducerState } from '@ngrx/router-store';
import { ToolbarState } from './toolbar/toolbar.state';
import { TodoListsState } from './todo-lists/todo-lists.state';
import { RouterStateUrl } from 'src/app/app-routing.module';
import { initialTodosState } from './shared/todos.reducer';
import { initialTodoListsState } from './todo-lists/todo-lists.reducer';
import { initialToolbarState } from './toolbar';

export interface AppState {
  todos: TodosState;
  todoLists: TodoListsState;
  toolbar: ToolbarState;
  router: RouterReducerState<RouterStateUrl>;
}

export const initialAppState: AppState = {
  todos: initialTodosState,
  todoLists: initialTodoListsState,
  toolbar: initialToolbarState,
  router: {
    'state': {
      'url': '/',
      'params': {},
      'queryParams': {}
    },
    'navigationId': 0
  }
};
