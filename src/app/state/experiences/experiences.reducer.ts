import { createReducer, on } from '@ngrx/store';
import { initialState } from './experiences.state';
import { loadExperiencesSuccess } from './experiences.actions';

export const _experiencesReducer = createReducer(
  initialState,
  on(loadExperiencesSuccess, (state, action) => {
    return {
      ...state,
      experiences: action.experiences,
    };
  })
);

export function experiencesReducer(state: any, action: any) {
  return _experiencesReducer(state, action);
}
