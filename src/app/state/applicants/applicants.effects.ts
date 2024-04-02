import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApplicantService } from '../../services/applicantService/applicant.service';
import { loadApplicants, loadApplicantsSuccess } from './applicants.actions';
import { map, mergeMap, pipe } from 'rxjs';

@Injectable()
export class ApplicantsEffects {
  constructor(
    private actions$: Actions,
    private applicantsService: ApplicantService
  ) {}

  loadApplicants$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadApplicants),
      mergeMap((action) => {
        return this.applicantsService.getApplicants().pipe(
          map((response) => {
            const applicants = response;
            return loadApplicantsSuccess({ applicants });
          })
        );
      })
    );
  });
}
