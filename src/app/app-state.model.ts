import { TodosState } from './shared/todos.state';
import { RouterReducerState } from '@ngrx/router-store';
import { ToolbarState } from './toolbar/toolbar.state';

export interface AppState {
  todos: TodosState;
  toolbar: ToolbarState;
  router: RouterReducerState;
}
