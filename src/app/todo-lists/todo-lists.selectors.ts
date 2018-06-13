import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectTodoListsState = (state: AppState) => state.todoLists;
export const selectTodoLists = createSelector(selectTodoListsState, x => x.todos);
export const selectTodo = createSelector(selectTodoListsState, x => x.todo);
