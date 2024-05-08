import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, of } from 'rxjs';
import { ExperienceService } from '../../services/experienceService/experience.service';
import { loadExperiences, loadExperiencesSuccess, updateExperience, updateExperienceSuccess } from './experiences.actions';

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



  updateExperience$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateExperience), mergeMap((action) => {
      return this.experienceService.updateExperience(action.id, action.experience).pipe(mergeMap((data) => {
        const updateBrandSuccessAction = updateExperienceSuccess();
        return of(updateBrandSuccessAction, loadExperiences());
      }))
    }))
  })


}
