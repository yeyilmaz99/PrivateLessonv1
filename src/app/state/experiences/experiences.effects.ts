import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs';
import { ExperienceService } from '../../services/experienceService/experience.service';
import { loadExperiences, loadExperiencesSuccess } from './experiences.actions';

@Injectable()
export class ExperiencesEffects {
  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService
  ) {}

  loadExperiences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadExperiences),
      mergeMap((action) => {
        return this.experienceService.getExperiences().pipe(
          map((response) => {
            const message = response.message;
            const experiences = response.data;
            return loadExperiencesSuccess({ experiences });
          })
        );
      })
    );
  });
}
