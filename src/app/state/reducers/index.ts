import { isDevMode, Type } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { toggleReducer } from '../toggle/toggle.reducer';
import { ToggleState } from '../toggle/toggle.state';
import { TextsState } from '../texts/texts.state';
import { textsReducer } from '../texts/texts.reducer';
import { PhotosState } from '../photos/photos.state';
import { photosReducer } from '../photos/photos.reducer';
import { ExperiencesState } from '../experiences/experiences.state';
import { EducationsState } from '../educations/educations.state';
import { LanguagesState } from '../languages/languages.state';
import { SkillsState } from '../skills/skills.state';
import { educationsReducer } from '../educations/educations.reducer';
import { experiencesReducer } from '../experiences/experiences.reducer';
import { languagesReducer } from '../languages/languages.reducer';
import { skillsReducer } from '../skills/skills.reducers';
import { FunctionalEffect } from '@ngrx/effects';
import { PhotosEffects } from '../photos/photos.effects';
import { TextEffects } from '../texts/texts.effects';
import { EducationsEffects } from '../educations/educations.effects';
import { ExperiencesEffects } from '../experiences/experiences.effects';
import { LanguagesEffects } from '../languages/languages.effects';
import { SkillsEffects } from '../skills/skills.effects';
import { applicantsReducer } from '../applicants/applicants.reducer';
import { ApplicantsState } from '../applicants/applicants.state';
import { ApplicantsEffects } from '../applicants/applicants.effects';
import { AuthState } from '../../components/auth/state/auth.state';
import { AuthReducer } from '../../components/auth/state/auth.reducer';
import { AuthEffects } from '../../components/auth/state/auth.effects';

export interface AppState {
  toggleState: ToggleState;
  textsState: TextsState;
  photosState: PhotosState;
  experiencesState: ExperiencesState;
  educationsState: EducationsState;
  languagesState: LanguagesState;
  skillsState: SkillsState;
  applicantsState: ApplicantsState;
  authState:AuthState
}

export const reducers: ActionReducerMap<AppState> = {
  toggleState: toggleReducer,
  textsState: textsReducer,
  photosState: photosReducer,
  educationsState: educationsReducer,
  experiencesState: experiencesReducer,
  languagesState: languagesReducer,
  skillsState: skillsReducer,
  applicantsState: applicantsReducer,
  authState:AuthReducer
};

export const effects: (Type<unknown> | Record<string, FunctionalEffect>)[] = [
  PhotosEffects,
  TextEffects,
  EducationsEffects,
  ExperiencesEffects,
  LanguagesEffects,
  SkillsEffects,
  ApplicantsEffects,
  AuthEffects
];

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];
