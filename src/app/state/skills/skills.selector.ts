import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SkillsState } from './skills.state';

export const SKILLS_STATE_NAME = 'skillsState';

const getSkillsState = createFeatureSelector<SkillsState>(SKILLS_STATE_NAME);

export const getAllSkills = createSelector(getSkillsState, (state) => {
  return state.skills;
});
