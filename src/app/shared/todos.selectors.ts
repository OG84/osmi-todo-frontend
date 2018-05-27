import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectTodosState = (state: AppState) => state.todos;
export const selectTodos = createSelector(selectTodosState, x => x.todos);
export const selectSelectedTodos = createSelector(selectTodosState, x => x.todos.filter(todo => todo.isSelected));
