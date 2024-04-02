import { Education } from '../../models/educationModel';
import { Experience } from '../../models/experienceModel';

export interface ExperiencesState {
  experiences: Experience[];
}

export const initialState: ExperiencesState = {
  experiences: [],
};
