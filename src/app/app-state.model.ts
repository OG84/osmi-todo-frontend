import { TodosState } from './shared/todos.state';
import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  todos: TodosState;
  router: RouterReducerState;
}
