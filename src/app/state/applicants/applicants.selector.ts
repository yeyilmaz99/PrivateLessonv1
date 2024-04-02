import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApplicantsState } from './applicants.state';

export const APPLICANT_STATE_NAME = 'applicantsState';

const getApplicantState =
  createFeatureSelector<ApplicantsState>(APPLICANT_STATE_NAME);

export const getAllApplicants = createSelector(getApplicantState, (state) => {
  return state.applicants;
});
