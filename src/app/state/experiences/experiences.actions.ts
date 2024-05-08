import { createAction, props } from '@ngrx/store';
import { Experience } from '../../models/experienceModel';
import { ExperienceForUpdate } from '../../models/experienceForUpdateDto';

export const LOAD_EXPERIENCES = '[Experiences] Load Experiences';
export const LOAD_EXPERIENCES_SUCCESS =
  '[Experiences] Load Experiences Success';


export const UPDATE_EXPERIENCE ='[Experiences] Update Experience';
export const UPDATE_EXPERIENCE_SUCCESS= '[Experiences] Update Experience Success';


export const updateExperience = createAction(UPDATE_EXPERIENCE, props<{id:number,experience:ExperienceForUpdate}>())
export const updateExperienceSuccess = createAction(UPDATE_EXPERIENCE_SUCCESS);

export const loadExperiences = createAction(LOAD_EXPERIENCES);
export const loadExperiencesSuccess = createAction(
  LOAD_EXPERIENCES_SUCCESS,
  props<{ experiences: Experience[] }>()
);
