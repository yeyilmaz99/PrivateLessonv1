import { createReducer, on } from '@ngrx/store';
import { initialState } from './skills.state';
import { loadSkillsSuccess } from './skills.actions';

export const _skillsReducer = createReducer(
  initialState,
  on(loadSkillsSuccess, (state, action) => {
    return {
      ...state,
      skills: action.skills,
    };
  })
);

export function skillsReducer(state: any, action: any) {
  return _skillsReducer(state, action);
}
