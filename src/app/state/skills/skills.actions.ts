import { createAction, props } from '@ngrx/store';
import { Skill, SkillForUpdate } from '../../models/skillModel';

export const LOAD_SKILLS = '[Skills] Load Skills';
export const LOAD_SKILLS_SUCCESS = '[Skills] Load Skills Success';


export const UPDATE_SKILL = '[Skills] Update Skill';
export const UPDATE_Skill_SUCCES ='[Skill] Update Skill Success';


export const updateSkill = createAction(UPDATE_SKILL, props<{id:number,skill:SkillForUpdate}>())
export const updateSkillSuccess = createAction(UPDATE_Skill_SUCCES);


export const loadSkills = createAction(LOAD_SKILLS);
export const loadSkillsSuccess = createAction(
  LOAD_SKILLS_SUCCESS,
  props<{ skills: Skill[] }>()
);
