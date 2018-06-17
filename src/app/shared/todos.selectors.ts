import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectTodosState = (state: AppState) => state.todos;
export const selectListInputValue = createSelector(selectTodosState, x => x.listInputValue);
export const selectIsListInputShaking = createSelector(selectTodosState, x => x.isListInputShaking);
