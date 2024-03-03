import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { toggleReducer } from '../reducers/toggle.reducer';

export interface AppState {

}

export const reducers: ActionReducerMap<AppState> = {
toggle:toggleReducer
};


export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
