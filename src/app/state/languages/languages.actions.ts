import { createAction, props } from '@ngrx/store';
import { Language, LanguageForUpdate } from '../../models/languageModel';

export const LOAD_LANGUAGES = '[Language] Load Languages';
export const LOAD_LANGUAGES_SUCCESS = '[Language] Load Languages Success';

export const UPDATE_LANGUAGE = '[Language] Update Language';
export const UPDATE_LANGUAGE_SUCCESS ='[Language] Update Language Success';


export const updateLanguage = createAction(UPDATE_LANGUAGE, props<{id:number,language:LanguageForUpdate}>())
export const updateLanguageSuccess = createAction(UPDATE_LANGUAGE_SUCCESS);


export const loadLanguages = createAction(LOAD_LANGUAGES);
export const loadLanguagesSuccess = createAction(
  LOAD_LANGUAGES_SUCCESS,
  props<{ languages: Language[] }>()
);
