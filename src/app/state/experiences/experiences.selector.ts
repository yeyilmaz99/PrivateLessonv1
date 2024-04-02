import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExperiencesState } from './experiences.state';

export const EXPERIENCES_STATE_NAME = 'experiencesState';

const getExperiencesState = createFeatureSelector<ExperiencesState>(
  EXPERIENCES_STATE_NAME
);

export const getAllExperiences = createSelector(
  getExperiencesState,
  (state) => {
    return state.experiences;
  }
);
