import { createAction, props } from '@ngrx/store';
import { Language } from '../../models/languageModel';

export const LOAD_LANGUAGES = '[Language] Load Languages';
export const LOAD_LANGUAGES_SUCCESS = '[Language] Load Languages Success';

export const loadLanguages = createAction(LOAD_LANGUAGES);
export const loadLanguagesSuccess = createAction(
  LOAD_LANGUAGES_SUCCESS,
  props<{ languages: Language[] }>()
);
