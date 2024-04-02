import { Language } from '../../models/languageModel';

export interface LanguagesState {
  languages: Language[];
}

export const initialState: LanguagesState = {
  languages: [],
};
