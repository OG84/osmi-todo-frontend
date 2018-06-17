import { TodosState } from './shared/todos.state';
import { RouterReducerState } from '@ngrx/router-store';
import { ToolbarState } from './toolbar/toolbar.state';
import { TodoListsState } from './todo-lists/todo-lists.state';
import { RouterStateUrl } from 'src/app/app-routing.module';

export interface AppState {
  todos: TodosState;
  todoLists: TodoListsState;
  toolbar: ToolbarState;
  router: RouterReducerState<RouterStateUrl>;
}
