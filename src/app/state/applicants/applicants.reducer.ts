import { createReducer, on } from '@ngrx/store';
import { initialState } from './applicants.state';
import { loadApplicantsSuccess } from './applicants.actions';

export const _applicantsReducer = createReducer(
  initialState,
  on(loadApplicantsSuccess, (state, action) => {
    return {
      ...state,
      applicants: action.applicants,
    };
  })
);

export function applicantsReducer(state: any, action: any) {
  return _applicantsReducer(state, action);
}
