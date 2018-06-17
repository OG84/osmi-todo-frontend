import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectTodoListsState = (state: AppState) => state.todoLists;
export const selectChildren = createSelector(selectTodoListsState, x => x.children);
export const selectSelf = createSelector(selectTodoListsState, x => x.self);
export const selectParent = createSelector(selectTodoListsState, x => x.parent);
