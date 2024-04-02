import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguagesState } from './languages.state';

export const LANGUAGE_STATE_NAME = 'languagesState';

const getLangugeState =
  createFeatureSelector<LanguagesState>(LANGUAGE_STATE_NAME);

export const getAllLanguages = createSelector(getLangugeState, (state) => {
  return state.languages;
});
