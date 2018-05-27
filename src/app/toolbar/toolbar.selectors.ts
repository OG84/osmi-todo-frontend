import { AppState } from '../app-state.model';
import { createSelector } from '@ngrx/store';

const selectToolbarState = (state: AppState) => state.toolbar;
export const selectToolbarTitle = createSelector(selectToolbarState, x => x.title);
