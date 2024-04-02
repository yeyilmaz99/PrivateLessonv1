import { createReducer, on } from '@ngrx/store';
import { initialState } from './educations.state';
import { loadEducationsSuccess } from './educations.actions';

export const _educationsReducer = createReducer(
  initialState,
  on(loadEducationsSuccess, (state, action) => {
    return {
      ...state,
      educations: action.educations,
    };
  })
);

export function educationsReducer(state: any, action: any) {
  return _educationsReducer(state, action);
}
