import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { EducationService } from '../../services/educationService/education.service';
import { loadEducations, loadEducationsSuccess } from './educations.actions';

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
}
