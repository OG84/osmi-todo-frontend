import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectTodosState = (state: AppState) => state.todos;
export const selectTodos = createSelector(selectTodosState, appState => appState.todos);
export const selectSelectedTodos = createSelector(selectTodos, x => {
  if (!x) {
    return [];
  }
  return x.filter(todo => todo.isSelected);
});
export const selectListInputValue = createSelector(selectTodosState, x => x.listInputValue);
export const selectIsListInputShaking = createSelector(selectTodosState, x => x.isListInputShaking);
