import { Injectable } from '@angular/core';
import { SkillService } from '../../services/skillService/skill.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSkills, loadSkillsSuccess } from './skills.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class SkillsEffects {
  constructor(private actions$: Actions, private skillService: SkillService) {}

  loadSkills$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadSkills),
      mergeMap((action) => {
        return this.skillService.getSkills().pipe(
          map((response) => {
            const message = response.message;
            const skills = response.data;
            return loadSkillsSuccess({ skills });
          })
        );
      })
    );
  });
}
