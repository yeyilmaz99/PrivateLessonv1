import { Applicant } from '../../models/applicantModel';

export interface ApplicantsState {
  applicants: Applicant[];
}

export const initialState: ApplicantsState = {
  applicants: [],
};
