import { createAction, props } from '@ngrx/store';
import { Skill } from '../../models/skillModel';

export const LOAD_SKILLS = '[Skills] Load Skills';
export const LOAD_SKILLS_SUCCESS = '[Skills] Load Skills Success';

export const loadSkills = createAction(LOAD_SKILLS);
export const loadSkillsSuccess = createAction(
  LOAD_SKILLS_SUCCESS,
  props<{ skills: Skill[] }>()
);
