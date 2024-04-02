import { Education } from '../../models/educationModel';

export interface EducationsState {
  educations: Education[];
}

export const initialState: EducationsState = {
  educations: [],
};
