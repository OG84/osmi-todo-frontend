import { AppState } from './app-state.model';
import { createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/app-routing.module';

export const selectRouterState = (state: AppState) => state.router.state;
export const selectRouterParams = createSelector(selectRouterState, x => x.params);
