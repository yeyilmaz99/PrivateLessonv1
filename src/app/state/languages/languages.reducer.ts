import { createReducer, on } from '@ngrx/store';
import { initialState } from './languages.state';
import { loadLanguagesSuccess } from './languages.actions';

export const _languagesReducer = createReducer(
  initialState,
  on(loadLanguagesSuccess, (state, action) => {
    return {
      ...state,
      languages: action.languages,
    };
  })
);

export function languagesReducer(state: any, action: any) {
  return _languagesReducer(state, action);
}
