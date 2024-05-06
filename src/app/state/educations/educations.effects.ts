import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of } from 'rxjs';
import { EducationService } from '../../services/educationService/education.service';
import { loadEducations, loadEducationsSuccess, updateEducation, updateEducationSuccess } from './educations.actions';

@Injectable()
export class EducationsEffects {
  constructor(
    private actions$: Actions,
    private educationService: EducationService
  ) {}

  loadEducations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadEducations),
      mergeMap((action) => {
        return this.educationService.getEducations().pipe(
          map((response) => {
            const message = response.message;
            const educations = response.data;
            return loadEducationsSuccess({ educations });
          })
        );
      })
    );
  });

  updateEducation$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateEducation), mergeMap((action) => {
        // this.store.dispatch(setLoadingSpinner({status:true, from:"update brand"}))
      return this.educationService.updateEducation(action.id, action.education).pipe(mergeMap((data) => {
        const updateBrandSuccessAction = updateEducationSuccess({education:action.education});
        // this.store.dispatch(setLoadingSpinner({status:false, from:"update brand success"}))
        return of(updateBrandSuccessAction, loadEducations());
      }))
    }))
  })
}
