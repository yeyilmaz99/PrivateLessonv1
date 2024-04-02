import { createAction, props } from '@ngrx/store';
import { Experience } from '../../models/experienceModel';

export const LOAD_EXPERIENCES = '[Experiences] Load Experiences';
export const LOAD_EXPERIENCES_SUCCESS =
  '[Experiences] Load Experiences Success';

export const loadExperiences = createAction(LOAD_EXPERIENCES);
export const loadExperiencesSuccess = createAction(
  LOAD_EXPERIENCES_SUCCESS,
  props<{ experiences: Experience[] }>()
);
