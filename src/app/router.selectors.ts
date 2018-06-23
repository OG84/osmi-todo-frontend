import { AppState } from './app-state.model';
import { createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/app-routing.module';

export const selectRouter = (state: AppState) => state.router;
export const selectRouterState = createSelector(selectRouter, x => x.state);
export const selectRouterParams = createSelector(selectRouterState, x => x.params);
