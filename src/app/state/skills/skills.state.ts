import { Skill } from '../../models/skillModel';

export interface SkillsState {
  skills: Skill[];
}

export const initialState: SkillsState = {
  skills: [],
};
