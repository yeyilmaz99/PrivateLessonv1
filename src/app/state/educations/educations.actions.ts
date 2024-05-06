import { createAction, props } from '@ngrx/store';
import { Education } from '../../models/educationModel';
import { EducationForUpdate } from '../../models/educationForUpdate';

export const LOAD_EDUCATIONS = '[Education] Load Educations';
export const LOAD_EDUCATIONS_SUCCESS = '[Education] Load Educations Success';

export const UPDATE_EDUCATION = '[Education] Update Education';
export const UPDATE_EDUCATION_SUCCES ='[Education] Update Education Success';


export const updateEducation = createAction(UPDATE_EDUCATION, props<{id:number,education:EducationForUpdate}>())
export const updateEducationSuccess = createAction(UPDATE_EDUCATION_SUCCES, props<{education:EducationForUpdate}>());

export const loadEducations = createAction(LOAD_EDUCATIONS);
export const loadEducationsSuccess = createAction(
  LOAD_EDUCATIONS_SUCCESS,
  props<{ educations: Education[] }>()
);
