import { Injectable } from '@angular/core';
import { SkillService } from '../../services/skillService/skill.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadSkills, loadSkillsSuccess, updateSkill, updateSkillSuccess } from './skills.actions';
import { map, mergeMap, of } from 'rxjs';

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

  updateSkill$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateSkill), mergeMap((action) => {
        // this.store.dispatch(setLoadingSpinner({status:true, from:"update brand"}))
      return this.skillService.updateSkill(action.id, action.skill).pipe(mergeMap((data) => {
        const updateSkillSuccessAction = updateSkillSuccess();
        // this.store.dispatch(setLoadingSpinner({status:false, from:"update brand success"}))
        return of(updateSkillSuccessAction, loadSkills());
      }))
    }))
  })

  
}
