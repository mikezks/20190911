import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromApp from './reducers/app.reducer';

export interface RootState {
  app: fromApp.State;
}

export const reducers: ActionReducerMap<RootState> = {
  app: fromApp.reducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
