import { createAction, props } from '@ngrx/store';
import { Education } from '../../models/educationModel';

export const LOAD_EDUCATIONS = '[Education] Load Educations';
export const LOAD_EDUCATIONS_SUCCESS = '[Education] Load Educations Success';

export const loadEducations = createAction(LOAD_EDUCATIONS);
export const loadEducationsSuccess = createAction(
  LOAD_EDUCATIONS_SUCCESS,
  props<{ educations: Education[] }>()
);
