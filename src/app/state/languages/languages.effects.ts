import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LanguageService } from '../../services/languageService/language.service';
import { loadLanguages, loadLanguagesSuccess, updateLanguage, updateLanguageSuccess } from './languages.actions';
import { map, mergeMap, of } from 'rxjs';

@Injectable()
export class LanguagesEffects {
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) {}

  loadLanguages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLanguages),
      mergeMap((action) => {
        return this.languageService.getLanguages().pipe(
          map((response) => {
            const message = response.message;
            const languages = response.data;
            return loadLanguagesSuccess({ languages });
          })
        );
      })
    );
  });

  updateLanguage$ = createEffect(() => {
    return this.actions$.pipe(ofType(updateLanguage), mergeMap((action) => {
        // this.store.dispatch(setLoadingSpinner({status:true, from:"update brand"}))
      return this.languageService.updateLanguage(action.id, action.language).pipe(mergeMap((data) => {
        const updateLanguageSuccessAction = updateLanguageSuccess();
        // this.store.dispatch(setLoadingSpinner({status:false, from:"update brand success"}))
        return of(updateLanguageSuccessAction, loadLanguages());
      }))
    }))
  })

}
