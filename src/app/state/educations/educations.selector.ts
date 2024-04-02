import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EducationsState } from './educations.state';

export const EDUCATION_STATE_NAME = 'educationsState';

const getEducationsState =
  createFeatureSelector<EducationsState>(EDUCATION_STATE_NAME);

export const getAllEducations = createSelector(getEducationsState, (state) => {
  return state.educations;
});
