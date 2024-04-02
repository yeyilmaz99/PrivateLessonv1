import { createAction, props } from '@ngrx/store';
import { Applicant } from '../../models/applicantModel';

export const LOAD_APPLICANTS = '[Applicant] Load Applicants';
export const LOAD_APPLICANTS_SUCCESS = '[Applicant] Load Applicants Success';

export const loadApplicants = createAction(LOAD_APPLICANTS);
export const loadApplicantsSuccess = createAction(
  LOAD_APPLICANTS_SUCCESS,
  props<{ applicants: Applicant[] }>()
);
